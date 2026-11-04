import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity.ts';
import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { OfferNotFoundException, OwnWishOfferException } from './exceptions.ts';
import { User } from '../users/entities/user.entity.ts';
import { WishesService } from '../wishes/wishes.service.ts';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer) private offersRepository: Repository<Offer>,
    private wishesService: WishesService,
  ) {}

  async create({
    createOfferDto,
    currentUser,
  }: {
    currentUser: User;
    createOfferDto: CreateOfferDto;
  }): Promise<Offer> {
    const { itemId, amount, hidden } = createOfferDto;

    const wishToOffer = await this.wishesService.findOne(
      { id: itemId },
      { owner: true },
    );

    if (wishToOffer.owner.id === currentUser.id) {
      throw new OwnWishOfferException();
    }

    await this.wishesService.increaseRaised({
      amount,
      wishId: itemId,
    });

    return this.offersRepository.save({
      item: { id: itemId },
      hidden,
      amount,
      user: currentUser,
    });
  }

  async findAll({
    query,
    relations,
  }: {
    query: FindOptionsWhere<Offer>;
    relations: FindOptionsRelations<Offer>;
  }): Promise<Offer[]> {
    return this.offersRepository.find({ where: query, relations: relations });
  }

  async findOne({
    query,
    relations,
  }: {
    query: FindOptionsWhere<Offer>;
    relations: FindOptionsRelations<Offer>;
  }): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: query,
      relations: relations,
    });

    if (offer === null) {
      throw new OfferNotFoundException();
    }

    return offer;
  }
}
