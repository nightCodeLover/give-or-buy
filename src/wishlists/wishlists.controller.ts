import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service.js';
import { CreateWishlistDto } from './dto/create-wishlist.dto.js';
import { UpdateWishlistDto } from './dto/update-wishlist.dto.js';
import { JwtGuard } from '../auth/guards/jwt.guard.ts';
import type { RequestWithUser } from '../auth/types.ts';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  findAll() {
    return this.wishlistsService.findAll({}, { owner: true, items: true });
  }

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() createWishlistDto: CreateWishlistDto,
    @Req() request: RequestWithUser,
  ) {
    return this.wishlistsService.create({
      createWishlistDto: createWishlistDto,
      user: request.user,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.wishlistsService.findOne(
      { id: Number(id) },
      { owner: true, items: true },
    );
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Req() request: RequestWithUser,
  ) {
    return this.wishlistsService.update({
      query: { id: Number(id) },
      updateWishlistDto,
      currentUser: request.user,
    });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: string,
    @Req() request: RequestWithUser,
  ) {
    return this.wishlistsService.remove({
      query: { id: Number(id) },
      currentUser: request.user,
    });
  }
}
