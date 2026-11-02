import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto.js';
import { UpdateWishDto } from './dto/update-wish.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity.ts';
import { FindOptionsWhere, Repository } from 'typeorm';
import { WishNotFoundException } from './exceptions.ts';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto) {
    return this.wishRepository.save(createWishDto);
  }

  async findAll(query: FindOptionsWhere<Wish>) {
    return this.wishRepository.findBy(query);
  }

  async findOne(query: FindOptionsWhere<Wish>) {
    const wish = await this.wishRepository.findOneBy(query);

    if (wish === null) {
      throw new WishNotFoundException();
    }

    return wish;
  }

  async update(query: FindOptionsWhere<Wish>, updateWishDto: UpdateWishDto) {
    const wish = await this.findOne(query);

    return this.wishRepository.update(wish.id, updateWishDto);
  }

  async remove(query: FindOptionsWhere<Wish>) {
    const wishToDelete = await this.findOne(query);

    await this.wishRepository.remove(wishToDelete);

    return wishToDelete;
  }
}
