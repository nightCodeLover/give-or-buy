import { BadRequestException, NotFoundException } from '@nestjs/common';

export class WishNotFoundException extends NotFoundException {
  constructor() {
    super('Gift not found');
  }
}

export class CopySameSelfWishException extends BadRequestException {
  constructor() {
    super('You cant copy your gift');
  }
}

export class UpdateWishNotOwnException extends BadRequestException {
  constructor() {
    super('You cant update not your gift');
  }
}

export class UpdateWishWithOfferException extends BadRequestException {
  constructor() {
    super('You cant update wish if some body made an offer');
  }
}

export class DeleteNotOwnWishException extends BadRequestException {
  constructor() {
    super('You cant delete not your gift');
  }
}

export class DeleteWishWithOffersException extends BadRequestException {
  constructor() {
    super('You cant delete gift with offers');
  }
}

export class AmountRaisedException extends BadRequestException {
  constructor() {
    super('Amount already has raised');
  }
}

export class HighAmountException extends BadRequestException {
  constructor() {
    super('Price is too big');
  }
}
