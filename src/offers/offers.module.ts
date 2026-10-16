import { Module } from '@nestjs/common';
import { OffersService } from './offers.service.js';
import { OffersController } from './offers.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity.ts';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
