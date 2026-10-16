import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service.js';
import { WishesController } from './wishes.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity.ts';

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WishesController],
  providers: [WishesService],
})
export class WishesModule {}
