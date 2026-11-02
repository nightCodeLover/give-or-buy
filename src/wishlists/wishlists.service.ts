import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto.js';
import { UpdateWishlistDto } from './dto/update-wishlist.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity.ts';
import { WishlistNotFoundException } from './exceptions.ts';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist) private wishRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto) {
    return this.wishRepository.save(createWishlistDto);
  }

  async findAll(query: FindOptionsWhere<Wishlist>) {
    return this.wishRepository.findBy(query);
  }

  async findOne(query: FindOptionsWhere<Wishlist>) {
    const wishlist = await this.wishRepository.findOneBy(query);

    if (wishlist === null) {
      throw new WishlistNotFoundException();
    }

    return wishlist;
  }

  async update(
    query: FindOptionsWhere<Wishlist>,
    updateWishlistDto: UpdateWishlistDto,
  ) {
    const wishlistToUpdate = await this.findOne(query);

    return this.wishRepository.save({
      ...wishlistToUpdate,
      ...updateWishlistDto,
    });
  }

  async remove(query: FindOptionsWhere<Wishlist>) {
    const wishToDelete = await this.findOne(query);

    await this.wishRepository.remove(wishToDelete);

    return wishToDelete;
  }
}
