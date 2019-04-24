import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DataBankWorldBankEntity } from './databank-worldbank.entity';
import startSync from './synchronize/index';

import { IDataBankWorldBankDTO } from '../../shared/modules/databank-worldbank/databank-worldbank.dto';
import { IChannelInfoDTO } from '../../shared/dtos/channel-info.dto';
import { GetAPIData } from '../util/axios';
import { ForEach } from '../util/for-each';
import { DataBankWorldBankDomain } from './databank-worldbank.domain';
import { SaveWithWithUniqueValidation } from '../util/validation/save-with-unique-validation';

export interface IdbwbResponseInfo {
  page: number;
  pages: number;
  per_page: number;
  total: number;
  sourceid: string;
  lastupdated: string;
}

@Injectable()
export class DataBankWorldBankService {
  constructor(
    @InjectRepository(DataBankWorldBankEntity)
    readonly dbwbRepository: Repository<DataBankWorldBankEntity>,
  ) {}

  getAll = async (): Promise<IDataBankWorldBankDTO[]> => {
    return await this.dbwbRepository
      .createQueryBuilder('dbwb')
      .select()
      .leftJoinAndSelect('dbwb.dim1', 'dim1')
      .leftJoinAndSelect('dbwb.dim2', 'dim2')
      .loadRelationCountAndMap('dbwb.matricesCount', 'dbwb.matrices')
      .getMany();
  }

  async insertSync(
    sync: DataBankWorldBankDomain,
  ): Promise<DataBankWorldBankDomain> {
    sync.lastUpdated = '0000-00-00';
    sync.apiUri = this.cleanApiUri(sync.apiUri);

    return await SaveWithWithUniqueValidation(this.dbwbRepository, sync);
  }

  async removeSync(id: number): Promise<void> {
    const toRemove = await this.dbwbRepository.findOne(id, {
      relations: ['matrices'],
    });

    if (toRemove.matrices.length) {
      throw new HttpException(
        'The DataBankWorldBank Entity has relations',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.dbwbRepository.delete({ id });
  }

  startSyncById = async (id: number): Promise<number> => {
    const sync = await this.dbwbRepository.findOne({
      where: { id },
      relations: ['dim1', 'dim2'],
    });
    if (!sync) {
      throw new HttpException('Sync not found', HttpStatus.NOT_FOUND);
    }
    const syncInfo = await startSync(sync);
    if (syncInfo) {
      sync.lastUpdated = syncInfo.lastupdated;
      await this.dbwbRepository.save(sync);
      return syncInfo.affectedMatrices;
    } else {
      return null;
    }
  }

  private getProperties = (obj: { [key: string]: any }): string[] => {
    const properties = [];
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        properties.push(
          ...this.getProperties(obj[key]).map(property => `.${key}${property}`),
        );
      } else {
        properties.push(`.${key}`);
      }
    });
    return properties;
  }
  public getChannelInfo = async (uri: string): Promise<IChannelInfoDTO> => {
    const apiData = await GetAPIData(
      `${this.cleanApiUri(uri)}?format=json&per_page=1`,
    );

    const apiInfo: IdbwbResponseInfo = apiData[0];
    if (!apiInfo.sourceid) {
      throw new HttpException('Channel Uri not found', HttpStatus.NOT_FOUND);
    } else if (apiInfo.total === 0) {
      throw new HttpException('No data in the API.', HttpStatus.NO_CONTENT);
    }

    const totalResults = apiInfo.total;
    const apiQuerys = [];
    ForEach([1, 2, 3], () => {
      // +1 -1 shifting for prevent selecting 0;
      const resultRandomNum =
        Math.round(Math.random() * (totalResults - 1)) + 1;
      apiQuerys.push(
        GetAPIData(
          `${this.cleanApiUri(
            uri,
          )}?format=json&per_page=1&page=${resultRandomNum}`,
        ),
      );
    });

    const someResults = (await Promise.all(apiQuerys)).map(
      apiQueryResult => apiQueryResult[1][0],
    );
    return {
      results: {
        total: totalResults,
        someRandom: someResults,
      },
      properties: this.getProperties(someResults[0]),
    };
  }

  private cleanApiUri(apiUri: string): string {
    const queryFrom = apiUri.indexOf('?');
    return queryFrom !== -1 ? apiUri.slice(0, queryFrom) : apiUri;
  }
}
