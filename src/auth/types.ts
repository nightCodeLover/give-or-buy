import { User } from '../users/entities/user.entity.ts';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: User;
}
