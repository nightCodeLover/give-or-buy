import { QueryFailedError } from 'typeorm';
import { UniqException } from './exceptions.ts';

const UNIQUE_VIOLATION_CODE = '23505';

export const isUniqueViolation = (error: unknown): boolean =>
  error instanceof QueryFailedError &&
  'code' in error.driverError &&
  error.driverError.code === UNIQUE_VIOLATION_CODE;

export const handleUniqueError = (error: unknown): never => {
  if (isUniqueViolation(error)) {
    throw new UniqException();
  }

  throw error;
};
