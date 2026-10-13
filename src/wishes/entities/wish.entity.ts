import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  type Relation,
} from 'typeorm';
import { IsUrl, Length } from 'class-validator';
import { STRING_NUMBER_TRANSFORMER } from '../../utils.ts';
import { Offer } from '../../offers/entities/offer.entity.ts';
import { User } from '../../users/entities/user.entity.ts';
import { Wishlist } from '../../wishlists/entities/wishlist.entity.ts';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: STRING_NUMBER_TRANSFORMER,
  })
  price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: STRING_NUMBER_TRANSFORMER,
  })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: Relation<User>;

  @Column()
  @Length(1, 1024)
  description: string;

  @Column()
  copied: number;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.items)
  wishlists: Wishlist[];
}
