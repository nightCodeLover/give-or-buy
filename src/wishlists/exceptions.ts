import { NotFoundException } from '@nestjs/common';

export class WishlistNotFoundException extends NotFoundException {
  constructor() {
    super('Wishlist not found');
  }
}
