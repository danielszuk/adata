import jsonQuery from 'json-query';

import { MatrixEntity } from 'src/modules/matrix/matrix.entity';
import { DataBankWorldBankEntity } from '../databank-worldbank.entity';
import { ValueEntity } from 'src/modules/matrix/value/value.entity';
import InsertMatrix from './insertMatrix.dbwb';
import { Repository, getRepository } from 'typeorm';

export default async (
  jsonDataArray: any,
  matrixEntityArrayInDatabase: MatrixEntity[],
  dbwbEntity: DataBankWorldBankEntity,
): Promise<any> => {
  for (let i = jsonDataArray.length - 1; 0 <= i; i--) {
    const jsonData = jsonDataArray[i];
    const uniqueNameInDatabase = await uniqueNameEntityArray(
      matrixEntityArrayInDatabase,
    );
    const uniqueName = jsonQuery(dbwbEntity.uniqueNameQuery, { data: jsonData })
      .value;

    const value = new ValueEntity();
    value.dim1 = jsonQuery(dbwbEntity.dim1Query, { data: jsonData }).value;
    value.dim2 = jsonQuery(dbwbEntity.dim2Query, { data: jsonData }).value;

    if (value.dim1 !== null && value.dim2 !== null) {
      if (-1 === uniqueNameInDatabase.indexOf(uniqueName)) {
        const name = jsonQuery(dbwbEntity.nameQuery, {
          data: jsonData,
        }).value;
        const newMx = await InsertMatrix(dbwbEntity, name, uniqueName);
        matrixEntityArrayInDatabase.push(newMx);
        uniqueNameInDatabase.push(uniqueName);
        value.matrix = newMx;
        await insertValue(value);
      } else {
        value.matrix = await getMatrixEntityFromArray(
          matrixEntityArrayInDatabase,
          uniqueName,
        );
        await insertValue(value);
      }
    }
  }

  return;
};

export const uniqueNameEntityArray = async (
  matrixEntityArrayInDatabase: MatrixEntity[],
): Promise<string[]> => {
  const inDatabaseArray: string[] = [];
  for (let i = matrixEntityArrayInDatabase.length - 1; 0 <= i; i--) {
    inDatabaseArray.push(matrixEntityArrayInDatabase[i].uniqueName);
  }
  return inDatabaseArray;
};

export const insertValue = async (value: ValueEntity): Promise<ValueEntity> => {
  const valueRepository: Repository<ValueEntity> = getRepository(ValueEntity);
  return await valueRepository.save(value);
};

export const getMatrixEntityFromArray = async (
  matrixEntityArrayInDatabase: MatrixEntity[],
  uniqueName: string,
): Promise<MatrixEntity> => {
  for (let i = matrixEntityArrayInDatabase.length - 1; 0 <= i; i--) {
    if (uniqueName === matrixEntityArrayInDatabase[i].uniqueName) {
      return matrixEntityArrayInDatabase[i];
    } else if (
      i === 0 &&
      uniqueName !== matrixEntityArrayInDatabase[i].uniqueName
    ) {
      return null;
    }
  }
};
