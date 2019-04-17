import {
  PipeTransform,
  ParseIntPipe,
  ArgumentMetadata,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipeOptional implements PipeTransform<string> {
  async transform(
    value: string,
    metadata: ArgumentMetadata,
  ): Promise<number | any> {
    if (value === undefined) {
      return value;
    } else {
      return new ParseIntPipe().transform(value, metadata);
    }
  }
}
