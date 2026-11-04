import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service.js';
import { WishlistsController } from './wishlists.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity.ts';
import { WishesModule } from '../wishes/wishes.module.ts';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist]), WishesModule],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
