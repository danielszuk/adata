import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { MatrixEntity } from '../matrix/matrix.entity';
import { MatchDomain } from './match.domain';
import { Pagination } from '../util/typeorm/pagination';
import { MatrixService } from '../matrix/matrix.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(MatrixEntity)
    private readonly matrixRepository: Repository<MatrixEntity>,
    @Inject('MatrixService')
    private readonly matrixService: MatrixService,
  ) {}

  private async findWithDimArray(dim: number[], p: Pagination): Promise<any> {
    return await this.matrixRepository
      .createQueryBuilder('matrix')
      .where('matrix.dim1 IN (:...idArray)', { idArray: dim })
      .orWhere('matrix.dim2 IN (:...idArray)', { idArray: dim })
      .skip(p.skip)
      .take(p.take)
      .getManyAndCount();
  }

  async getMatch(match: MatchDomain, p: Pagination): Promise<any> {
    if (match.dim1 !== undefined && match.dim2 !== undefined) {
      const mxDimArr = [match.dim1, match.dim2];
      return await this.findWithDimArray(mxDimArr, p);
    } else if (match.dim1 !== undefined && match.dim2 === undefined) {
      return await this.findWithDimArray([match.dim1], p);
    } else if (match.dim1 === undefined && match.dim2 !== undefined) {
      return await this.findWithDimArray([match.dim2], p);
    } else {
      const randomMx = await this.matrixService.getRandomMatrix();
      return await this.findWithDimArray(
        [randomMx.dim1.id, randomMx.dim2.id],
        p,
      );
    }
  }
}
