import { Repository, getRepository, In } from 'typeorm';

import { DataBankWorldBankEntity } from '../databank-worldbank.entity';
import { MatrixEntity } from '../../matrix/matrix.entity';

export default async (
  uniqueNameArray: string[],
  dbwbEntity: DataBankWorldBankEntity,
): Promise<{ matrixEntityArrayInDatabase: MatrixEntity[] }> => {
  if (uniqueNameArray.length === 0) {
    return { matrixEntityArrayInDatabase: [] };
  }

  const matrixRepository: Repository<MatrixEntity> = getRepository(
    MatrixEntity,
  );

  return {
    matrixEntityArrayInDatabase: await matrixRepository.find({
      where: { sync: dbwbEntity.id, uniqueName: In(uniqueNameArray) },
    }),
  };
};
