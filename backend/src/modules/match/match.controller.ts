import { Controller, Get, Query } from '@nestjs/common';

import { MatchService } from './match.service';
import { MatchDomain } from './match.domain';
import { Validate } from '../util/validate';
import { ParseIntPipeOptional } from '../util/pipe/ParseIntPipeOptional.pipe';
import { GetPagination } from '../util/typeorm/pagination';

@Controller('match')
export class MatchController {
  constructor(readonly matchService: MatchService) {}

  @Get()
  async getMatch(
    @Query('matrixId', new ParseIntPipeOptional()) matrixId: number,
    @Query('dim1', new ParseIntPipeOptional()) dim1: number,
    @Query('dim2', new ParseIntPipeOptional()) dim2: number,
    @Query() query,
  ): Promise<any> {
    const match = new MatchDomain(matrixId, dim1, dim2);
    await Validate(match, MatchDomain);
    return await this.matchService.getMatch(match, await GetPagination(query));
  }
}
