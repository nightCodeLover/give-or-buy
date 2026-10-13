import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service.js';
import { WishesController } from './wishes.controller.js';

@Module({
  controllers: [WishesController],
  providers: [WishesService],
})
export class WishesModule {}
