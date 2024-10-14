import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { ShotDto } from './dto/shot.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  //API for initialize the game
  @Post('/start-game')
  async createGame(@Body() createGameDto: CreateGameDto) {
    return this.gameService.createGame(createGameDto);
  }

  //API for process shot
  @Post('/:id/shot')
  async processShot(@Param('id') gameId: number, @Body() shotDto: ShotDto) {
    return this.gameService.processShot(gameId, shotDto);
  }

  //API for get current status
  @Get('/:id')
  async getGameState(@Param('id') gameId: number) {
    return this.gameService.getGameState(gameId);
  }

  //API for get game status report
  @Get('/:id/status')
  async checkGameStatus(@Param('id') gameId: number) {
    return this.gameService.checkGameStatus(gameId);
  }
}
