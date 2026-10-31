import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LocalGuard } from './guards/local.guard.ts';
import { UsersService } from '../users/users.service.ts';
import type { RequestWithUser } from './types.ts';
import { CreateUserDto } from '../users/dto/create-user.dto.ts';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signIn(@Req() request: RequestWithUser) {
    return this.authService.auth(request.user);
  }

  @Post('signup')
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body);

    return this.authService.auth(user);
  }
}
