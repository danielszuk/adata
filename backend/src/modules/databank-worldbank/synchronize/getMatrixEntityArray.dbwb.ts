import { Repository, getRepository, In } from 'typeorm';

import { MatrixEntity } from 'src/modules/matrix/matrix.entity';
import { DataBankWorldBankEntity } from '../databank-worldbank.entity';

export default async (
  uniqueNameArray: string[],
  dbwbEntity: DataBankWorldBankEntity,
): Promise<{ matrixEntityArrayInDatabase: MatrixEntity[] }> => {
  if (uniqueNameArray.length === 0) { return { matrixEntityArrayInDatabase: [] }; }

  const matrixRepository: Repository<MatrixEntity> = getRepository(
    MatrixEntity,
  );

  return {
    matrixEntityArrayInDatabase: await matrixRepository.find({
      where: { sync: dbwbEntity.id, uniqueName: In(uniqueNameArray) },
    }),
  };
};
