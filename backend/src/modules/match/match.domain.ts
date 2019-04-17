import { IsOptional, Min, IsNotEmpty, IsInt } from 'class-validator';

export class MatchDomain {
  constructor(matrix, dim1, dim2?) {
    this.matrix = matrix;
    this.dim1 = dim1;
    this.dim2 = dim2;
  }

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly matrix: number;

  @IsOptional()
  @Min(1)
  @IsInt()
  readonly dim1: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly dim2: number;
}
