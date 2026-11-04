import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './entities/user.entity.ts';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotFoundException } from './exceptions.ts';
import { HashService } from '../hash/hash.service.ts';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPas = await this.hashService.getHash(createUserDto.password);

    return this.userRepository.save({ ...createUserDto, password: hashedPas });
  }

  async findMany(query: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return this.userRepository.findBy(query);
  }

  async findOne(query: FindOptionsWhere<User>): Promise<User> {
    const user = await this.userRepository.findOneBy(query);

    if (user === null) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async findOneWithPassword(query: FindOptionsWhere<User>) {
    const user = await this.userRepository.findOne({
      where: query,
      select: { password: true, id: true },
    });

    if (user === null) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async update(query: FindOptionsWhere<User>, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(query);

    if (Object.keys(updateUserDto).length === 0) {
      return user;
    }

    await this.userRepository.update(user.id, updateUserDto);

    return this.findOne(query);
  }
}
