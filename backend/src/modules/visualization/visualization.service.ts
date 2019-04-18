import { Logger } from '../util/logger';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, getRepository, createQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { VisualizationEntity } from './visualization.entity';
import { VisualizationDomain } from './visualization.domain';
import { Pagination } from '../util/typeorm/pagination';
import { MatrixEntity } from '../matrix/matrix.entity';
import { UserEntity } from '../user/user.entity';
import { VisualizationMatrixEntity } from './visualization.matirx/visualization.matrix.entity';
import { IVisualizationDomainDTO } from 'src/shared/modules/visualization/visualization.dto';
import { VisualizationMatrixDomain } from './visualization.matirx/visualization.matrix.domain';
import Axios from 'axios';
import { Env } from '../util/env/variables';

const logger = new Logger('visualization.service');

@Injectable()
export class VisualizationService {
  constructor(
    @InjectRepository(VisualizationEntity)
    private readonly visualizationRepository: Repository<VisualizationEntity>,
  ) {}

  async createVisualization(
    vDomain: VisualizationDomain,
    user: UserEntity,
  ): Promise<any> {
    const vmArray = [];
    vDomain.matrices.forEach(eachVm => {
      const vm = new VisualizationMatrixEntity();
      const m = new MatrixEntity();
      m.id = eachVm.matrix.id;
      vm.matrix = m;
      vm.color = eachVm.color;
      vmArray.push(vm);
    });
    vDomain.user = user;
    vDomain.matrices = await getRepository(VisualizationMatrixEntity).save(
      vmArray,
    );

    const visualization = await this.visualizationRepository.save(vDomain);
    await Axios.get(
      `${Env.CRAWLER_URL}/visualization/${visualization.id}/screen-shot`,
    ).catch(error => {
      logger.error(error);
    });

    return visualization;
  }

  async getVisualizations(p: Pagination): Promise<any> {
    return await this.visualizationRepository
      .createQueryBuilder('v')
      .select('v.id')
      .addSelect('v.title')
      .addSelect('v.description')
      .leftJoinAndSelect('v.matrices', 'matrices')
      .leftJoinAndSelect('matrices.matrix', 'matrix')
      .leftJoinAndSelect('matrix.values', 'values')
      .leftJoinAndSelect('matrix.dim1', 'dim1')
      .leftJoinAndSelect('matrix.dim2', 'dim2')
      .leftJoinAndSelect('v.x', 'x')
      .leftJoinAndSelect('v.y', 'y')
      .leftJoinAndSelect('v.y2', 'y2')
      .skip(p.skip)
      .take(p.take)
      .orderBy('v.id', 'DESC')
      .getManyAndCount();
  }

  async getVisualization(id: number): Promise<VisualizationDomain> {
    const visualization = await this.visualizationRepository
      .createQueryBuilder('v')
      .select('v.id')
      .addSelect('v.title')
      .addSelect('v.description')
      .leftJoinAndSelect('v.user', 'user')
      .leftJoinAndSelect('v.matrices', 'matrices')
      .leftJoinAndSelect('matrices.matrix', 'matrix')
      .leftJoinAndSelect('matrix.values', 'values')
      .leftJoinAndSelect('matrix.dim1', 'dim1')
      .leftJoinAndSelect('matrix.dim2', 'dim2')
      .leftJoinAndSelect('v.x', 'x')
      .leftJoinAndSelect('v.y', 'y')
      .leftJoinAndSelect('v.y2', 'y2')
      .where('v.id = :id', { id })
      .getOne();

    if (!visualization) {
      throw new HttpException('Visualization not found.', HttpStatus.NOT_FOUND);
    }
    return visualization;
  }

  async getUsersVisualizations(user: any, p: Pagination): Promise<any> {
    return await this.visualizationRepository
      .createQueryBuilder('v')
      .select('v.id')
      .addSelect('v.title')
      .addSelect('v.description')
      .where('v.user = :user', { user: user.id })
      .leftJoinAndSelect('v.matrices', 'matrices')
      .leftJoinAndSelect('matrices.matrix', 'matrix')
      .leftJoinAndSelect('matrix.values', 'values')
      .leftJoinAndSelect('matrix.dim1', 'dim1')
      .leftJoinAndSelect('matrix.dim2', 'dim2')
      .leftJoinAndSelect('v.x', 'x')
      .leftJoinAndSelect('v.y', 'y')
      .leftJoinAndSelect('v.y2', 'y2')
      .skip(p.skip)
      .take(p.take)
      .orderBy('v.id', 'DESC')
      .getManyAndCount();
  }

  async searchVisualization(keyword: string, p: Pagination): Promise<any> {
    const searchItems = await this.visualizationRepository
      .createQueryBuilder('v')
      .select('v.id')
      .addSelect('v.title')
      .addSelect('v.description')
      .addSelect('v.x')
      .addSelect('v.y')
      .addSelect('v.y2')
      .where('LOWER(v.title) like LOWER(:keyword)', {
        keyword: `%${keyword}%`,
      })
      .orWhere(
        'v.description IS NOT NULL AND LOWER(v.description) like LOWER(:keyword)',
        {
          keyword: `%${keyword}%`,
        },
      )
      .leftJoinAndSelect('v.x', 'x')
      .leftJoinAndSelect('v.y', 'y')
      .leftJoinAndSelect('v.y2', 'y2')
      .leftJoinAndSelect('v.matrices', 'matrices')
      .leftJoinAndSelect('matrices.matrix', 'matrix')
      .leftJoinAndSelect('matrix.values', 'values')
      .leftJoinAndSelect('matrix.dim1', 'dim1')
      .leftJoinAndSelect('matrix.dim2', 'dim2')
      .skip(p.skip)
      .take(p.take)
      .orderBy('v.id', 'DESC')
      .getManyAndCount();

    for (const searchItem of searchItems[0]) {
      searchItem.description = searchItem.description
        ? searchItem.description.substring(0, 100)
        : undefined;
    }
    return searchItems;
  }

  public async putVisualization(
    visualization: VisualizationDomain,
    user: UserEntity,
  ): Promise<any | VisualizationEntity> {
    visualization.matrices.forEach(visualizationMatrix => {});
    const updateVisualization = await this.visualizationRepository.findOne(
      {
        id: visualization.id,
      },
      { relations: ['user'] },
    );
    if (updateVisualization.user.id === user.id) {
      visualization.matrices = await this.updateVisualizationMatrices(
        visualization,
      );
      return await this.visualizationRepository.save(visualization);
    } else {
      visualization.id = undefined;
      return await this.createVisualization(visualization, user);
    }
  }

  private async updateVisualizationMatrices(
    visualization: VisualizationDomain,
  ): Promise<VisualizationMatrixEntity[]> {
    await getRepository(VisualizationMatrixEntity).delete({ visualization });
    const updateArray: VisualizationMatrixDomain[] = [];
    visualization.matrices.forEach(eachVm => {
      const vm = new VisualizationMatrixEntity();
      const m = new MatrixEntity();
      m.id = eachVm.matrix.id;
      vm.matrix = m;
      vm.color = eachVm.color;
      updateArray.push(vm);
    });
    return await getRepository(VisualizationMatrixEntity).save(updateArray);
  }

  public async deleteVisualization(
    id: number,
    user: UserEntity,
  ): Promise<boolean> {
    const v = await this.visualizationRepository.findOne(
      { id },
      { relations: ['user'] },
    );
    if (!v) {
      return false;
    }
    if (v.user.id === user.id) {
      await getRepository(VisualizationMatrixEntity).delete({
        visualization: { id },
      });
      return await !!this.visualizationRepository.delete({ id });
    } else {
      return false;
    }
  }
}
