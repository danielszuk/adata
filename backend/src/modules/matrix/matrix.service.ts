import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MatrixEntity } from './matrix.entity';
import { Pagination } from '../util/typeorm/pagination';

Injectable();
export class MatrixService {
  constructor(
    @InjectRepository(MatrixEntity)
    private readonly matrixRepository: Repository<MatrixEntity>,
  ) {}

  async searchMatrices(search: string, p: Pagination) {
    if (null === search || undefined === search || search.length === 0) {
      return await this.matrixRepository
        .createQueryBuilder('matrix')
        .select()
        .leftJoinAndSelect('matrix.dim1', 'dim1')
        .leftJoinAndSelect('matrix.dim2', 'dim2')
        // .orderBy('RANDOM()')
        .skip(p.skip)
        .take(p.take)
        .getManyAndCount();
    } else {
      return await this.matrixRepository
        .createQueryBuilder('matrix')
        .select()
        .leftJoinAndSelect('matrix.dim1', 'dim1')
        .leftJoinAndSelect('matrix.dim2', 'dim2')
        .where('LOWER(matrix.name) LIKE :search', {
          search: `%${search.toLowerCase()}%`,
        })
        .orWhere('LOWER(dim1.name) LIKE :search', {
          search: `%${search.toLowerCase()}%`,
        })
        .orWhere('LOWER(dim1.unit) LIKE :search', {
          search: `%${search.toLowerCase()}%`,
        })
        .orWhere('LOWER(dim2.name) LIKE :search', {
          search: `%${search.toLowerCase()}%`,
        })
        .orWhere('LOWER(dim2.unit) LIKE :search', {
          search: `%${search.toLowerCase()}%`,
        })
        .skip(p.skip)
        .take(p.take)
        .getManyAndCount();
    }
  }

  async getMatrixById(id: number): Promise<any> {
    return await this.matrixRepository.findOne({
      where: { id },
      relations: ['values', 'dim1', 'dim2'],
    });
  }

  async getRandomMatrix(): Promise<MatrixEntity> {
    return await this.matrixRepository
      .createQueryBuilder('matrix')
      .select()
      .leftJoinAndSelect('matrix.dim1', 'dim1')
      .leftJoinAndSelect('matrix.dim2', 'dim2')
      .orderBy('RANDOM()')
      .getOne();
  }

  public async checkForDimensionRelations(id: number): Promise<boolean> {
    return (await this.matrixRepository
      .createQueryBuilder('matrix')
      .select()
      .where('matrix.dim1 = :id', { id })
      .orWhere('matrix.dim2 = :id', { id })
      .getOne())
      ? true
      : false;
  }

  public findMatrixWithIdArray = async (
    idArray: [],
  ): Promise<MatrixEntity[]> => {
    return await this.matrixRepository.find({
      where: { id: In([...idArray]) },
    });
  }
}
