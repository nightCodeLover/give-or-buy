import { Test, TestingModule } from '@nestjs/testing';
import { WishesController } from './wishes.controller.js';
import { WishesService } from './wishes.service.js';

describe('WishesController', () => {
  let controller: WishesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishesController],
      providers: [WishesService],
    }).compile();

    controller = module.get<WishesController>(WishesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
