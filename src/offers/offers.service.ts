import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity.ts';
import { Repository } from 'typeorm';
import { OfferNotFoundException } from './exceptions.ts';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offersRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const { itemId, amount, hidden } = createOfferDto;
    const item = { id: itemId };

    return this.offersRepository.save({ item, hidden, amount });
  }

  async findAll(): Promise<Offer[]> {
    return this.offersRepository.find();
  }

  async findOne(id: number): Promise<Offer> {
    const offer = await this.offersRepository.findOneBy({ id });

    if (offer === null) {
      throw new OfferNotFoundException();
    }

    return offer;
  }
}
