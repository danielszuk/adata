import { Env } from '../env/variables';

export function GetPagination(query): Pagination {
  let skip: number = 0;
  const take = Env.API_DEFAULT_PAGE_LIMIT;
  console.log();

  const parsedPage: number = parseInt(query.page, 10) - 1;
  if (Number.isInteger(parsedPage) && 0 <= parsedPage) {
    skip = parsedPage * take;
  }
  // const parsedTake = parseInt(query.take);
  // if (Number.isInteger(parsedTake) && 10 <= parsedTake && parsedTake <= 100)
  //   take = parsedTake;
  return { skip, take };
}

export class Pagination {
  skip: number = 0;
  take: number = 10;
}
