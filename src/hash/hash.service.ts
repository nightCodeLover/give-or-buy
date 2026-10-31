import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { HASH_SALT } from './constants.ts';

@Injectable()
export class HashService {
  public async getHash(str: string) {
    return await bcrypt.hash(str, HASH_SALT);
  }

  public async compareHash(hash: string, password: string) {
    return await bcrypt.compare(password, hash);
  }
}
