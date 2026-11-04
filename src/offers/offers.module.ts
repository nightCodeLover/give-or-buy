import { Module } from '@nestjs/common';
import { OffersService } from './offers.service.js';
import { OffersController } from './offers.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity.ts';
import { WishesModule } from '../wishes/wishes.module.ts';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), WishesModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
