import { Offer } from '../entities/offer.entity.ts';
import { PickType } from '@nestjs/mapped-types';
import { IsInt, IsPositive } from 'class-validator';

export class CreateOfferDto extends PickType(Offer, ['amount', 'hidden']) {
  @IsPositive()
  @IsInt()
  itemId: number;
}
