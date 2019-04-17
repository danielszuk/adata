import {
  Controller,
  Post,
  UsePipes,
  Body,
  Get,
  Query,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';

import { VisualizationService } from './visualization.service';
import { VisualizationDomain } from './visualization.domain';
import { GetPagination } from '../util/typeorm/pagination';
import { JwtAuthGuard } from '../user/auth/jwt/jwt.guard';
import { ApiResponse } from '@nestjs/swagger';
import { IVisualizationDomainDTO } from '../../shared/modules/visualization/visualization.dto';

@Controller('visualization')
export class VisualizationController {
  constructor(private readonly visualizationService: VisualizationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(VisualizationDomain)
  async createVisualization(
    @Body() v: VisualizationDomain,
    @Req() req,
  ): Promise<any> {
    return await this.visualizationService.createVisualization(v, req.user);
  }

  @Get()
  async getVisualizations(@Query() query): Promise<any> {
    return await this.visualizationService.getVisualizations(
      await GetPagination(query),
    );
  }

  @Get('search')
  async searchVisualization(
    @Query('keyword') keyword: string,
    @Query() query,
  ): Promise<any> {
    if (null === keyword || undefined === keyword || keyword.length === 0) {
      throw new HttpException('Invalid keyword', HttpStatus.BAD_REQUEST);
    }
    return await this.visualizationService.searchVisualization(
      keyword,
      GetPagination(query),
    );
  }

  @Get('my-visualization')
  @UseGuards(JwtAuthGuard)
  async getUsersVisualizations(@Req() request, @Query() query): Promise<any> {
    return this.visualizationService.getUsersVisualizations(
      request.user,
      GetPagination(query),
    );
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return visualization with given ID.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: `Haven't found any visualization with given ID.`,
  })
  async getVisualization(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<IVisualizationDomainDTO> {
    return await this.visualizationService.getVisualization(id);
  }
}
