import { Wishlist } from '../entities/wishlist.entity.ts';
import { PickType } from '@nestjs/mapped-types';
import { IsArray, IsInt } from 'class-validator';

export class CreateWishlistDto extends PickType(Wishlist, ['image', 'name']) {
  @IsArray()
  @IsInt({ each: true })
  itemsId: number[];
}
