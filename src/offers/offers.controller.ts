import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { GET_CACHE_NAME } from './constants.ts';
import { JwtGuard } from '../auth/guards/jwt.guard.ts';

@UseGuards(JwtGuard)
@Controller('offers')
@UseInterceptors(CacheInterceptor)
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  @CacheKey(GET_CACHE_NAME)
  @Get()
  findAll() {
    return this.offersService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.offersService.findOne({ id: Number(id) });
  }
}
