import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/entities/game.entity';
import { Player } from 'src/game/entities/player.entity';
import { Ship } from 'src/game/entities/ship.entity';
import { Shot } from 'src/game/entities/shot.entity';

export const DatabaseProvider = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: './src/database/battleship.db',
  entities: [Game, Player, Ship, Shot],
  synchronize: true,
});
