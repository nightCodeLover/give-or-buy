import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import type { RequestWithUser } from '../auth/types.ts';
import { HashService } from '../hash/hash.service.ts';
import { JwtGuard } from '../auth/guards/jwt.guard.ts';
import { FindUserDto } from './dto/find-user.dto.ts';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  @Get('me')
  findMe(@Req() request: RequestWithUser) {
    const { id } = request.user;

    return this.usersService.findOne({ id });
  }

  @Patch('me')
  async updateMe(
    @Req() request: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { id } = request.user;

    if (updateUserDto.password) {
      const hashedPass = await this.hashService.getHash(updateUserDto.password);

      return this.usersService.update(
        { id },
        { ...updateUserDto, password: hashedPass },
      );
    }

    return this.usersService.update({ id }, updateUserDto);
  }

  @Get('me/wishes')
  findWishes(@Req() request: RequestWithUser) {
    const { id } = request.user;

    // Запросить подарки отдельно из wishesService
  }

  @Get(':username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findOne({ username });
  }

  @Get(':username/wishes')
  findWishesByUsername(@Param('username') username: string) {
    // Запросить подарки отдельно из wishesService
  }

  @Post('find')
  findByQuery(@Body() queryObj: FindUserDto) {
    const { query } = queryObj;

    return this.usersService.findMany([{ email: query }, { username: query }]);
  }
}
