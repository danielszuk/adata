export function GetPagination(query): Pagination {
  let skip: number = 0;
  const take: number = 10;

  const parsedPage: number = parseInt(query.page, 10) - 1;
  if (Number.isInteger(parsedPage) && 0 <= parsedPage) {
    skip = parsedPage * parseInt(process.env.API_MATCH_PAGE_LIMIT || '10', 10);
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
