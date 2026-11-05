import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto.js';
import { UpdateWishDto } from './dto/update-wish.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity.ts';
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import {
  AmountRaisedException,
  DeleteNotOwnWishException,
  DeleteWishWithOffersException,
  HighAmountException,
  UpdateWishNotOwnException,
  UpdateWishWithOfferException,
  WishNotFoundException,
} from './exceptions.ts';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  create(createWishDto: CreateWishDto) {
    return this.wishRepository.save(createWishDto);
  }

  findAll(
    query: FindOptionsWhere<Wish> | FindOptionsWhere<Wish>[],
    relations?: FindOptionsRelations<Wish>,
  ) {
    return this.wishRepository.find({ where: query, relations: relations });
  }

  findFirstMany({
    order,
    take,
    relations,
  }: {
    order: FindOptionsOrder<Wish>;
    take: number;
    relations?: FindOptionsRelations<Wish>;
  }) {
    return this.wishRepository.find({ order, take, relations });
  }

  async findOne(
    query: FindOptionsWhere<Wish>,
    relations?: FindOptionsRelations<Wish>,
  ) {
    const wish = await this.wishRepository.findOne({ where: query, relations });

    if (wish === null) {
      throw new WishNotFoundException();
    }

    return wish;
  }

  async update({
    updateWishDto,
    query,
    currentUserId,
  }: {
    query: FindOptionsWhere<Wish>;
    updateWishDto: UpdateWishDto;
    currentUserId: number;
  }) {
    const wish = await this.findOne(query, { owner: true });

    if (Object.keys(updateWishDto).length === 0) {
      return wish;
    }

    if (wish.owner.id !== currentUserId) {
      throw new UpdateWishNotOwnException();
    }

    if (wish.raised !== 0) {
      throw new UpdateWishWithOfferException();
    }

    await this.wishRepository.update(wish.id, updateWishDto);

    return this.wishRepository.findOne({ where: { id: wish.id } });
  }

  async remove({
    query,
    currentUserId,
  }: {
    currentUserId: number;
    query: FindOptionsWhere<Wish>;
  }) {
    const wishToDelete = await this.findOne(query, {
      owner: true,
      offers: true,
    });

    if (wishToDelete.owner.id !== currentUserId) {
      throw new DeleteNotOwnWishException();
    }

    if (wishToDelete.raised !== 0) {
      throw new DeleteWishWithOffersException();
    }

    await this.wishRepository.remove(wishToDelete);

    return wishToDelete;
  }

  async increaseRaised({ wishId, amount }: { wishId: number; amount: number }) {
    const wish = await this.findOne({ id: wishId });

    if (wish.raised >= wish.price) {
      throw new AmountRaisedException();
    }

    if (amount > wish.price - wish.raised) {
      throw new HighAmountException();
    }

    return this.wishRepository.update(
      { id: wishId },
      { raised: wish.raised + amount },
    );
  }

  async increaseCopy(id: number) {
    const wish = await this.findOne({ id });

    return this.wishRepository.update(id, { copied: wish.copied + 1 });
  }
}
