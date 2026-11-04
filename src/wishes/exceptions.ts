import { BadRequestException, NotFoundException } from '@nestjs/common';

export class WishNotFoundException extends NotFoundException {
  constructor() {
    super('Wish not found');
  }
}

export class CopySameSelfWishException extends BadRequestException {
  constructor() {
    super('You cant copy your wish');
  }
}

export class UpdateWishNotOwnException extends BadRequestException {
  constructor() {
    super('You cant update not your wish');
  }
}

export class UpdateWishWithOfferException extends BadRequestException {
  constructor() {
    super('You cant update wish if some body made an offer');
  }
}

export class DeleteNotOwnWishException extends BadRequestException {
  constructor() {
    super('You cant delete not your wish');
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
