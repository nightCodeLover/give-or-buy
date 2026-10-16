import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service.js';
import { WishlistsController } from './wishlists.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity.ts';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
