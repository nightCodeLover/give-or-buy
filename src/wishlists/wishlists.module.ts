import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service.js';
import { WishlistsController } from './wishlists.controller.js';

@Module({
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
