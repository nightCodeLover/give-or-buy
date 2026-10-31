import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/user.entity.ts';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.ts';
import { HashService } from '../hash/hash.service.ts';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private hashService: HashService,
  ) {}

  public auth(user: User) {
    const jwtPayload = { sub: user.id };

    return { access_token: this.jwtService.sign(jwtPayload) };
  }

  public async validatePassword(email: string, password: string) {
    const user = await this.userService.findOne({ email });

    const isCorrectPassword = await this.hashService.compareHash(
      user.password,
      password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
