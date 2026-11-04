import { BadRequestException, NotFoundException } from '@nestjs/common';

export class OfferNotFoundException extends NotFoundException {
  constructor() {
    super('Offer not found');
  }
}

export class OwnWishOfferException extends BadRequestException {
  constructor() {
    super('You cant make offer on your wish');
  }
}
