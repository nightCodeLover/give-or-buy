import { User } from '../entities/user.entity.ts';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUserDto extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
  'offers',
  'wishes',
  'wishlists',
]) {}
