import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';

export async function Validate<T>(value: any, type: T): Promise<any> {
  const validateObject: T = value;
  const errors = await validate(validateObject);
  if (0 < errors.length) throw new BadRequestException(errors);
}

export const ValidateArray = async () => {};
