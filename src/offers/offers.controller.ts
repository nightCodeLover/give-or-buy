import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OffersService } from './offers.service.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { JwtGuard } from '../auth/guards/jwt.guard.ts';
import type { RequestWithUser } from '../auth/types.ts';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(
    @Body() createOfferDto: CreateOfferDto,
    @Req() request: RequestWithUser,
  ) {
    return this.offersService.create({
      createOfferDto,
      currentUser: request.user,
    });
  }

  @Get()
  findAll() {
    return this.offersService.findAll({
      relations: { user: true, item: true },
      query: { hidden: false },
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.offersService.findOne({
      query: { id: Number(id), hidden: false },
      relations: { user: true, item: true },
    });
  }
}
