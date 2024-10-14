import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';

describe('GameController', () => {
  let gameController: GameController;
  let gameService: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        {
          provide: GameService,
          useValue: {
            createGame: jest.fn(),
            processShot: jest.fn(),
            getGameState: jest.fn(),
            checkGameStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    gameController = module.get<GameController>(GameController);
    gameService = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(gameController).toBeDefined();
  });
});
