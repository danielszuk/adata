import { Repository, getRepository, In } from 'typeorm';
import { MatrixEntity } from '../../matrix/matrix.entity';
import { ValueEntity } from '../../matrix/value/value.entity';

export default async (
  matrixEntityArrayInDatabase: MatrixEntity[],
): Promise<any> => {
  const matrixIdArray: number[] = [];
  for (let i = matrixEntityArrayInDatabase.length - 1; 0 <= i; i--) {
    await matrixIdArray.push(matrixEntityArrayInDatabase[i].id);
  }
  const valueRepository: Repository<ValueEntity> = getRepository(ValueEntity);
  return await valueRepository.delete({ matrix: In(matrixIdArray) });
};
