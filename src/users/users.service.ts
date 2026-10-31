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

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(param: FindOptionsWhere<User>): Promise<User> {
    const user = await this.userRepository.findOneBy(param);

    if (user === null) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne({ id });

    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const userToDelete = await this.findOne({ id });

    await this.userRepository.remove(userToDelete);

    return userToDelete;
  }
}
