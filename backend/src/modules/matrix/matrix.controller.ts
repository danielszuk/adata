import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';

import { MatrixService } from './matrix.service';
import { GetPagination } from '../util/typeorm/pagination';

@Controller('matrix')
export class MatrixController {
  constructor(readonly matrixService: MatrixService) {}

  @Get('search')
  async searchMatrices(
    @Query('search') search: string,
    @Query() query,
  ): Promise<any> {
    return this.matrixService.searchMatrices(
      search,
      await GetPagination(query),
    );
  }

  @Get(':id')
  async getMatrixById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<any> {
    return await this.matrixService.getMatrixById(id);
  }
}
