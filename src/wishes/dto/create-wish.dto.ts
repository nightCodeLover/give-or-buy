import { Wish } from '../entities/wish.entity.ts';
import { OmitType } from '@nestjs/mapped-types';

export class CreateWishDto extends OmitType(Wish, [
  'createdAt',
  'updatedAt',
  'id',
  'offers',
  'wishlists',
]) {}
