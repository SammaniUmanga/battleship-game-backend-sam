import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { Ship } from './entities/ship.entity';
import { Shot } from './entities/shot.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { ShotDto } from './dto/shot.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(Ship)
    private shipRepository: Repository<Ship>,
    @InjectRepository(Shot)
    private shotRepository: Repository<Shot>,
  ) {}

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const player = await this.playerRepository.findOne({
      where: { player_id: createGameDto.player_id },
    });

    if (!player) {
      throw new NotFoundException(
        `Player with ID ${createGameDto.player_id} not found`,
      );
    }
    const game = new Game();
    game.player = player;
    game.status = 'ongoing';
    game.grid_size = '10x10'; //The program should create a 10x10 grid

    const savedGame = await this.gameRepository.save(game);

    // Randomly generate ships for the game
    const ships: Ship[] = this.generateShips(savedGame);
    await this.shipRepository.save(ships);

    return savedGame;
  }

  private generateShips(game: Game): Ship[] {
    const ships: Ship[] = [];

    //For 1x Battleship (5 squares)
    const battleship = new Ship();
    battleship.game = game;
    battleship.type = 'Battleship';
    battleship.size = 5;
    battleship.coordinates = this.randomCoordinates(battleship.size);
    ships.push(battleship);

    //For 2x Destroyers (4 squares)
    for (let i = 0; i < 2; i++) {
      const destroyer = new Ship();
      battleship.game = game;
      destroyer.type = 'Destroyer';
      destroyer.size = 4;
      destroyer.coordinates = this.randomCoordinates(destroyer.size);
      ships.push(destroyer);
    }

    return ships;
  }

  // Generate random coordinates for ships
  private randomCoordinates(size: number): string {
    const coordinates = [];
    for (let i = 0; i < size; i++) {
      coordinates.push(`A${i + 1}`); // EX: A1, A2, A3...
    }
    return coordinates.join(',');
  }

  async processShot(gameId: number, shotDto: ShotDto): Promise<any> {
    const game = await this.gameRepository.findOne({
      where: { game_id: gameId },
      relations: ['ships', 'shots'],
    });

    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }

    const existingShot = await this.shotRepository.findOne({
      where: { coordinate: shotDto.coordinate, game: { game_id: gameId } },
    });

    if (existingShot) {
      return { message: 'You have already shot at this coordinate' };
    }
    const shot = new Shot();
    shot.coordinate = shotDto.coordinate;
    shot.game = game;

    let isHit = false;
    for (const ship of game.ships) {
      if (ship.coordinates.includes(shotDto.coordinate)) {
        shot.is_hit = true;
        ship.is_sunk = this.checkIfShipIsSunk(ship, shotDto.coordinate);
        isHit = true;
        await this.shipRepository.save(ship);
        break;
      }
    }

    await this.shotRepository.save(shot);

    return {
      message: isHit ? 'Hit!' : 'Miss!',
      isHit,
      gameStatus: await this.checkGameStatus(gameId),
    };
  }

  // Check if a ship is fully sunk
  private checkIfShipIsSunk(ship: Ship, hitCoordinate: string): boolean {
    const hitCoordinates = ship.coordinates.split(',');
    return hitCoordinates.every((coord) => coord === hitCoordinate);
  }

  // Check if all ships are sunk or the game is still ongoing
  async checkGameStatus(gameId: number): Promise<any> {
    const game = await this.gameRepository.findOne({
      where: { game_id: gameId },
      relations: ['ships'],
    });

    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }

    const allShipsSunk = game.ships.every((ship) => ship.is_sunk);

    if (allShipsSunk) {
      game.status = 'over';
      game.is_over = true;
      await this.gameRepository.save(game);
    }

    return {
      game_id: game.game_id,
      status: game.status,
      is_over: game.is_over,
      ships_remaining: game.ships.filter((ship) => !ship.is_sunk).length,
    };
  }

  // Get the current state of the game (ships and shots)
  async getGameState(gameId: number): Promise<any> {
    const game = await this.gameRepository.findOne({
      where: { game_id: gameId },
      relations: ['ships', 'shots'],
    });

    if (!game) {
      throw new NotFoundException(`Game with ID ${gameId} not found`);
    }

    return {
      game_id: game.game_id,
      ships: game.ships.map((ship) => ({
        id: ship.ship_id,
        type: ship.type,
        coordinates: ship.coordinates.split(','),
        is_sunk: ship.is_sunk,
      })),
      shots: game.shots.map((shot) => ({
        id: shot.shot_id,
        coordinate: shot.coordinate,
        is_hit: shot.is_hit,
      })),
      status: game.status,
    };
  }
}
