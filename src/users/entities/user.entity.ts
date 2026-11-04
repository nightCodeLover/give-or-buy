import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity.ts';
import { Offer } from '../../offers/entities/offer.entity.ts';
import { Wishlist } from '../../wishlists/entities/wishlist.entity.ts';
import { Exclude, Expose } from 'class-transformer';

const ABOUT_DEFAULT_VALUE = 'Пока ничего не рассказал о себе';
const AVATAR_DEFAULT_VALUE = 'https://i.pravatar.cc/300';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  @Length(2, 30)
  username: string;

  @Column({ default: ABOUT_DEFAULT_VALUE })
  @Length(0, 200)
  @IsOptional()
  about?: string;

  @Column({ default: AVATAR_DEFAULT_VALUE })
  @IsUrl()
  @IsOptional()
  avatar?: string;

  @Column({ unique: true })
  @IsEmail()
  @Expose({ groups: ['me'] })
  email: string;

  @Column({ select: false })
  @IsString()
  @Length(2)
  @Exclude()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  @IsOptional()
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  @IsOptional()
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  @IsOptional()
  wishlists: Wishlist[];
}
