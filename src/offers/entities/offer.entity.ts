import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity.ts';
import { STRING_NUMBER_TRANSFORMER } from '../../utils.ts';
import { Wish } from '../../wishes/entities/wish.entity.ts';
import { IsBoolean, IsNumber, IsOptional, IsPositive } from 'class-validator';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: STRING_NUMBER_TRANSFORMER,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  @IsOptional()
  hidden?: boolean;
}
