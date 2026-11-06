import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module.ts';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HashModule } from '../hash/hash.module.ts';
import { LocalStrategy } from './strategys/local-strategy.ts';
import { JwtStrategy } from './strategys/jwt-strategy.ts';
import { SignOptions } from 'jsonwebtoken';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    HashModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, HashModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>(
            'JWT_TOKEN_LIVE_TIME',
            '15m',
          ) as SignOptions['expiresIn'],
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
