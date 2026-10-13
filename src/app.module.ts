import { Module } from '@nestjs/common';
import { AppController } from './app.controller.ts';
import { AppService } from './app.service.ts';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersModule } from './offers/offers.module.ts';
import { WishlistsModule } from './wishlists/wishlists.module.ts';
import { WishesModule } from './wishes/wishes.module.ts';
import { UsersModule } from './users/users.module.ts';
import { Offer } from './offers/entities/offer.entity.ts';
import { User } from './users/entities/user.entity.ts';
import { Wish } from './wishes/entities/wish.entity.ts';
import { Wishlist } from './wishlists/entities/wishlist.entity.ts';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST'),
        port: Number(config.get('DATABASE_PORT')),
        username: config.get('DATABASE_USER'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        entities: [Offer, User, Wish, Wishlist],
      }),
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
