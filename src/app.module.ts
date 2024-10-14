import { Module } from '@nestjs/common';
import { getEnvPath } from './config/env.helper';
import { GameModule } from './game/game.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

const envFilePath: string = getEnvPath('./envFiles');
console.log(`envFilePath --> ${envFilePath}`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    GameModule, 
    DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
