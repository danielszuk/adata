import { Repository, getRepository } from 'typeorm';

import { DataBankWorldBankEntity } from '../databank-worldbank.entity';
import { MatrixEntity } from 'src/modules/matrix/matrix.entity';

export default async (
  dbwbEntity: DataBankWorldBankEntity,
  name: string,
  uniqueName: string,
): Promise<MatrixEntity> => {
  const newMx = new MatrixEntity();
  newMx.uniqueName = uniqueName;
  newMx.name = name;
  newMx.sync = dbwbEntity;
  newMx.dim1 = dbwbEntity.dim1;
  newMx.dim2 = dbwbEntity.dim2;

  const matrixRepository: Repository<MatrixEntity> = getRepository(
    MatrixEntity,
  );

  return await matrixRepository.save(newMx);
};
