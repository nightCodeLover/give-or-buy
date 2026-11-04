import { NotFoundException } from '@nestjs/common';

export class WishlistNotFoundException extends NotFoundException {
  constructor() {
    super('Wishlist not found');
  }
}

export class WishesNotFoundException extends NotFoundException {
  constructor() {
    super('Not all the gifts were found');
  }
}

export class UpdateNotOwnException extends NotFoundException {
  constructor() {
    super('You cannot update this wishlist');
  }
}

export class DeleteNotOwnException extends NotFoundException {
  constructor() {
    super('You cannot delete this wishlist');
  }
}
