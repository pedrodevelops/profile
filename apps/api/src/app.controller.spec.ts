import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '@api/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return server health', () => {
      expect(appController.getHealth()).toEqual(
        expect.objectContaining({
          status: 'UP',
          uptime: expect.any(Number),
          timestamp: expect.any(String),
          environment: 'development',
        }),
      );
    });
  });
});
