import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export const SaveWithWithUniqueValidation = async <T>(
  repository: Repository<any>,
  entity: T,
): Promise<T> => {
  try {
    return await repository.save(entity);
  } catch (err) {
    if (err && err.code === '23505') {
      throw new HttpException('Unique violdation', HttpStatus.CONFLICT);
    } else {
      throw new Error(err);
    }
  }
};
