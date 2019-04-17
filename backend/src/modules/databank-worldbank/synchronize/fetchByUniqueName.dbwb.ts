import jsonQuery from 'json-query';

import { DataBankWorldBankEntity } from '../databank-worldbank.entity';

export default async (
  dbwbEntity: DataBankWorldBankEntity,
  jsonDataArray: any,
): Promise<{
  uniqueNameArray: string[];
}> => {
  const uniqueNameArray: string[] = [];
  for (let i = jsonDataArray.length - 1; 0 <= i; i--) {
    const jsonData = jsonDataArray[i];
    const uniqueName = jsonQuery(dbwbEntity.uniqueNameQuery, {
      data: jsonData,
    }).value;
    if (-1 === uniqueNameArray.indexOf(uniqueName)) {
      uniqueNameArray.push(uniqueName);
    }
  }

  return { uniqueNameArray };
};
