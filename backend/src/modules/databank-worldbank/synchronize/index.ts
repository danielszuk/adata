import { DataBankWorldBankEntity } from '../databank-worldbank.entity';
import FetchByUniqueName from './fetchByUniqueName.dbwb';
import GetMatrixEntityArray from './getMatrixEntityArray.dbwb';
import { CONSTANTS } from '../databank-worldbank.constants';
import RemoveValues from './removeValues.dbwb';
import InsertValues from './insertValues.dbwb';
import { IdbwbResponseInfo } from '../databank-worldbank.service';
import { Logger } from '../../util/logger';
import { MatrixEntity } from '../../matrix/matrix.entity';
import { GetAPIData } from '../../util/axios';

const logger = new Logger('Databank-Worldbank-sync');

interface ISyncInfo {
  lastupdated: string;
  affectedMatrices: number;
}

export default async (
  dbwbEntity: DataBankWorldBankEntity,
): Promise<ISyncInfo> => {
  // Check last update, and total number
  const apiInfo: IdbwbResponseInfo = (await queryValues(
    dbwbEntity.apiUri,
    1,
    true,
  ))[0];
  logger.log(
    `Api Uri info received. Last updated: ${
      apiInfo.lastupdated
    }, Total values: ${apiInfo.total}`,
  );

  let affectedMatrices = 0;
  if (apiInfo.lastupdated > dbwbEntity.lastUpdated && apiInfo.total) {
    const alreadyTruncatedMatrices: MatrixEntity[] = [];

    let page = 1;
    let totalPage: number;
    do {
      const jsonResponse = await queryValues(dbwbEntity.apiUri, page);
      const jsonInfo: IdbwbResponseInfo = jsonResponse[0];
      logger.log(
        `Api Uri response received. Page: ${jsonInfo.page}, Total pages: ${
          jsonInfo.pages
        }`,
      );
      totalPage = jsonInfo.pages;

      const jsonDataArray = jsonResponse[CONSTANTS.dataArrayIndex];
      // vévigmegyünk a dataArray-en és uniqueName-t belepakoljuk egy string tömbbe..., hogy csak egy legyen benne...
      const { uniqueNameArray } = await FetchByUniqueName(
        dbwbEntity,
        jsonDataArray,
      );

      // db lekérdezés uniqueNameArray alapján
      const { matrixEntityArrayInDatabase } = await GetMatrixEntityArray(
        uniqueNameArray,
        dbwbEntity,
      );

      // Check if we already truncated the matrix (in last pages)
      const matricesToTruncate = matrixEntityArrayInDatabase.filter(
        matrix =>
          !alreadyTruncatedMatrices.some(
            wipedMatrix => wipedMatrix.id === matrix.id,
          ),
      );
      // values-ok törlése
      if (0 < matricesToTruncate.length) {
        await RemoveValues(matricesToTruncate);
        alreadyTruncatedMatrices.push(...matricesToTruncate);
      }
      // végig meyyek matrixEntityArray(osszes) matrixEntityArrayInDatabase

      // matrix beszúrás.... (ha nincs)
      // mégegyszer végigmegyünk a dataArray-en de már a value-kat is beszúrjuk
      await InsertValues(
        jsonDataArray,
        matrixEntityArrayInDatabase,
        dbwbEntity,
      );
      logger.log(`Page '${jsonInfo.page}' values inserted.`);

      // TODO: bad affectedMatrices value
      affectedMatrices += matrixEntityArrayInDatabase.length;
      page += 1;
    } while (page <= totalPage);

    // Return last updated
    return { lastupdated: apiInfo.lastupdated, affectedMatrices };
  } else if (!apiInfo.total) {
    logger.warn(`There is no data in this Api Uri.`);
  } else {
    logger.log(
      `Api Uri is already synchronized with the latest version. Entity last updated: ${
        dbwbEntity.lastUpdated
      }, Api Uri last updated: ${apiInfo.lastupdated}`,
    );
  }
};

const queryValues = async (
  uri: string,
  page: number,
  onlyInfo?: boolean,
): Promise<any> => {
  const query = `format=json&per_page=${
    onlyInfo ? 1 : CONSTANTS.valuePerPage
  }&page=${page}`;
  return await GetAPIData(uri + '?' + query);
};
