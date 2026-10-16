import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto.js';
import { UpdateWishlistDto } from './dto/update-wishlist.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findAll() {
    return this.wishRepository.find();
  }

  async findOne(id: number) {
    const wishlist = await this.wishRepository.findOneBy({ id });

    if (wishlist === null) {
      throw new WishlistNotFoundException();
    }

    return wishlist;
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    const wishlistToUpdate = await this.findOne(id);

    return this.wishRepository.save({
      ...wishlistToUpdate,
      ...updateWishlistDto,
    });
  }

  async remove(id: number) {
    const wishToDelete = await this.findOne(id);

    await this.wishRepository.remove(wishToDelete);

    return wishToDelete;
  }
}
