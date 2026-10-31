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

  @Column()
  @Length(2, 30)
  username: string;

  @Column({ default: ABOUT_DEFAULT_VALUE })
  @Length(2, 200)
  @IsOptional()
  about?: string;

  @Column({ default: AVATAR_DEFAULT_VALUE })
  @IsUrl()
  @IsOptional()
  avatar?: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
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
