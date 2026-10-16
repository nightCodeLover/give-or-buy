import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto.js';
import { UpdateWishDto } from './dto/update-wish.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity.ts';
import { Repository } from 'typeorm';
import { WishNotFoundException } from './exceptions.ts';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish) private wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto) {
    return this.wishRepository.save(createWishDto);
  }

  async findAll() {
    return this.wishRepository.find();
  }

  async findOne(id: number) {
    const wish = await this.wishRepository.findOneBy({ id });

    if (wish === null) {
      throw new WishNotFoundException();
    }

    return wish;
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    await this.findOne(id);

    return this.wishRepository.update(id, updateWishDto);
  }

  async remove(id: number) {
    const wishToDelete = await this.findOne(id);

    await this.wishRepository.remove(wishToDelete);

    return wishToDelete;
  }
}
