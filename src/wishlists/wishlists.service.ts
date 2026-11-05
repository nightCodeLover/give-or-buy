import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto.js';
import { UpdateWishlistDto } from './dto/update-wishlist.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { Wishlist } from './entities/wishlist.entity.ts';
import {
  DeleteNotOwnException,
  UpdateNotOwnException,
  WishesNotFoundException,
  WishlistNotFoundException,
} from './exceptions.ts';
import { User } from '../users/entities/user.entity.ts';
import { WishesService } from '../wishes/wishes.service.ts';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private wishesService: WishesService,
  ) {}

  async create({
    createWishlistDto,
    user,
  }: {
    createWishlistDto: CreateWishlistDto;
    user: User;
  }) {
    const { itemsId, ...wishlistData } = createWishlistDto;

    const items = await this.findWishes(itemsId);

    const wishlist = await this.wishlistRepository.save({
      ...wishlistData,
      items,
      owner: user,
    });

    return this.findOne({ id: wishlist.id }, { owner: true, items: true });
  }

  async findAll(
    query: FindOptionsWhere<Wishlist>,
    relations?: FindOptionsRelations<Wishlist>,
  ) {
    return this.wishlistRepository.find({ where: query, relations });
  }

  async findOne(
    query: FindOptionsWhere<Wishlist>,
    relations?: FindOptionsRelations<Wishlist>,
  ) {
    const wishlist = await this.wishlistRepository.findOne({
      where: query,
      relations,
    });

    if (wishlist === null) {
      throw new WishlistNotFoundException();
    }

    return wishlist;
  }

  async update({
    query,
    currentUser,
    updateWishlistDto,
  }: {
    query: FindOptionsWhere<Wishlist>;
    updateWishlistDto: UpdateWishlistDto;
    currentUser: User;
  }) {
    const wishlistToUpdate = await this.findOne(query, {
      owner: true,
      items: true,
    });

    if (wishlistToUpdate.owner.id !== currentUser.id) {
      throw new UpdateNotOwnException();
    }

    const { itemsId, ...wishlistData } = updateWishlistDto;

    const items = itemsId
      ? await this.findWishes(itemsId)
      : wishlistToUpdate.items;

    await this.wishlistRepository.save({
      ...wishlistToUpdate,
      ...wishlistData,
      items,
    });

    return this.findOne(
      { id: wishlistToUpdate.id },
      { owner: true, items: true },
    );
  }

  async remove({
    currentUser,
    query,
  }: {
    currentUser: User;
    query: FindOptionsWhere<Wishlist>;
  }) {
    const wishToDelete = await this.findOne(query, {
      owner: true,
      items: { owner: true, offers: true },
    });

    if (wishToDelete.owner.id !== currentUser.id) {
      throw new DeleteNotOwnException();
    }

    await this.wishlistRepository.remove(wishToDelete);

    return wishToDelete;
  }

  private async findWishes(itemsId: number[]) {
    const wishes = await this.wishesService.findAll({ id: In(itemsId) });

    if (wishes.length !== new Set(itemsId).size) {
      throw new WishesNotFoundException();
    }

    return wishes;
  }
}
