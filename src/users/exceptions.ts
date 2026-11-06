import { ConflictException, NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super('User not found');
  }
}

export class UniqException extends ConflictException {
  constructor() {
    super('A user with this email or username is already registered');
  }
}
