import { NotFoundException } from '@nestjs/common';

export class WishNotFoundException extends NotFoundException {
  constructor() {
    super('Wish not found');
  }
}
