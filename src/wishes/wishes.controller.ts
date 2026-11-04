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
import { WishesService } from './wishes.service.js';
import { CreateWishDto } from './dto/create-wish.dto.js';
import { UpdateWishDto } from './dto/update-wish.dto.js';
import { JwtGuard } from '../auth/guards/jwt.guard.ts';
import { LAST_WISHES_TO_SHOW_COUNT, TOP_WISHES_COUNT } from './constants.ts';
import type { RequestWithUser } from '../auth/types.ts';
import { CopySameSelfWishException } from './exceptions.ts';
import { Wish } from './entities/wish.entity.ts';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() createWishDto: CreateWishDto,
    @Req() request: RequestWithUser,
  ): Promise<Wish> {
    return this.wishesService.create({ ...createWishDto, owner: request.user });
  }

  @Get('/last')
  findLast() {
    return this.wishesService.findFirstMany({
      order: { createdAt: 'DESC' },
      take: LAST_WISHES_TO_SHOW_COUNT,
      relations: { owner: true },
    });
  }

  @Get('/top')
  findTop() {
    return this.wishesService.findFirstMany({
      order: { copied: 'DESC' },
      take: TOP_WISHES_COUNT,
      relations: { owner: true },
    });
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.wishesService.findOne(
      { id: Number(id) },
      { owner: true, offers: true },
    );
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Req() request: RequestWithUser,
  ) {
    const currentUserId = request.user.id;

    return this.wishesService.update({
      currentUserId,
      query: { id: Number(id) },
      updateWishDto,
    });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string,
    @Req() request: RequestWithUser,
  ) {
    const currentUserId = request.user.id;

    return this.wishesService.remove({
      query: { id: Number(id) },
      currentUserId,
    });
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(
    @Param('id', ParseIntPipe) id: string,
    @Req() request: RequestWithUser,
  ) {
    const currentUserId = request.user.id;

    const { owner, name, link, description, image, price } =
      await this.wishesService.findOne({ id: Number(id) }, { owner: true });

    if (currentUserId === owner.id) {
      throw new CopySameSelfWishException();
    }

    await this.wishesService.create({
      raised: 0,
      copied: 0,
      price,
      image,
      description,
      link,
      name,
      owner: request.user,
    });

    await this.wishesService.increaseCopy(Number(id));

    return {};
  }
}
