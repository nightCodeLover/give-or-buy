import { Module } from '@nestjs/common';
import { HashService } from './hash.service.ts';

@Module({ providers: [HashService], exports: [HashService] })
export class HashModule {}
