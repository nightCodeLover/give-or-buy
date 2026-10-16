import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity.ts';
import { Repository, UpdateResult } from 'typeorm';
import { OfferNotFoundException } from './exceptions.ts';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offersRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersRepository.save(createOfferDto);
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

  async update(
    id: number,
    updateOfferDto: UpdateOfferDto,
  ): Promise<UpdateResult> {
    await this.findOne(id);

    return this.offersRepository.update(id, updateOfferDto);
  }

  async remove(id: number): Promise<Offer | null> {
    const offerToDelete = await this.findOne(id);

    await this.offersRepository.remove(offerToDelete);

    return offerToDelete;
  }
}
