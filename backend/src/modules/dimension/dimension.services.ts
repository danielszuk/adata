import { Injectable, HttpStatus, Inject, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatrixService } from '../matrix/matrix.service';
import { SaveWithWithUniqueValidation } from 'src/modules/util/validation/save-with-unique-validation';
import { DimensionEntity } from './dimension.entity';
import { DimensionDomain } from './dimension.domain';
import { IDimensionDTO } from '../../shared/modules/dimension/dimension.dto';

@Injectable()
export class DimensionService {
  constructor(
    @InjectRepository(DimensionEntity)
    private readonly dimensionRepository: Repository<DimensionEntity>,
    @Inject('MatrixService')
    private readonly matrixService: MatrixService,
  ) {}

  insertDimension = async (
    dimension: DimensionDomain,
  ): Promise<IDimensionDTO> => {
    const newDimension = await SaveWithWithUniqueValidation<DimensionDomain>(
      this.dimensionRepository,
      dimension,
    );

    return {
      ...newDimension,
      matricesByDim1Count: 0,
      matricesByDim2Count: 0,
      dbwbsByDim1Count: 0,
      dbwbsByDim2Count: 0,
    };
  }

  getAllDimensionsWithDetails = async (): Promise<IDimensionDTO[]> => {
    return await this.dimensionRepository
      .createQueryBuilder('dimension')
      .select()
      .loadRelationCountAndMap(
        'dimension.matricesByDim1Count',
        'dimension.matrixByDim1',
      )
      .loadRelationCountAndMap(
        'dimension.matricesByDim2Count',
        'dimension.matrixByDim2',
      )
      .loadRelationCountAndMap(
        'dimension.dbwbsByDim1Count',
        'dimension.dbwbByDim1',
      )
      .loadRelationCountAndMap(
        'dimension.dbwbsByDim2Count',
        'dimension.dbwbByDim2',
      )
      .getMany();
  }

  selectDimensionById = async (id): Promise<any> => {
    return await this.dimensionRepository.findByIds(id);
  }

  public async updateDimension(dimension: DimensionDomain) {
    await this.dimensionRepository.save(dimension);
  }

  deleteDimensionById = async (id: number): Promise<any> => {
    if (await this.matrixService.checkForDimensionRelations(id)) {
      throw new HttpException(
        'The specified Dimension has relations',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.dimensionRepository.delete({ id });
    }
  }
}
