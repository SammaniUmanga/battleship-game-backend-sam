import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game } from "./entities/game.entity";
import { Shot } from "./entities/shot.entity";
import { Ship } from "./entities/ship.entity";
import { Player } from "./entities/player.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Game, Shot, Ship, Player])],
    controllers: [GameController],
    providers: [GameService],
})

export class GameModule {}