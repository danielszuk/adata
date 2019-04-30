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
  Put,
  Delete,
} from '@nestjs/common';

import { VisualizationService } from './visualization.service';
import { VisualizationDomain } from './visualization.domain';
import { GetPagination } from '../util/typeorm/pagination';
import { JwtAuthGuard } from '../user/auth/jwt/jwt.guard';
import { ApiResponse } from '@nestjs/swagger';
import { IVisualizationDomainDTO } from '../../shared/modules/visualization/visualization.dto';
import { Env } from '../util/env/variables';

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
    return {
      ...(await this.visualizationService.getVisualizations(
        await GetPagination(query),
      )),
      countPerPage: Env.API_DEFAULT_PAGE_LIMIT,
    };
  }

  @Get('search')
  async searchVisualization(
    @Query('keyword') keyword: string,
    @Query() query,
  ): Promise<any> {
    if (null === keyword || undefined === keyword || keyword.length === 0) {
      throw new HttpException('Invalid keyword', HttpStatus.BAD_REQUEST);
    }
    return {
      ...(await this.visualizationService.searchVisualization(
        keyword,
        GetPagination(query),
      )),
      countPerPage: Env.API_DEFAULT_PAGE_LIMIT,
    };
  }

  @Get('my-visualization')
  @UseGuards(JwtAuthGuard)
  async getUsersVisualizations(@Req() request, @Query() query): Promise<any> {
    return {
      ...(await this.visualizationService.getUsersVisualizations(
        request.user,
        GetPagination(query),
      )),
      countPerPage: Env.API_DEFAULT_PAGE_LIMIT,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return visualization with given ID.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: `No visualization with given ID.`,
  })
  async getVisualization(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<IVisualizationDomainDTO> {
    return await this.visualizationService.getVisualization(id);
  }

  @Put()
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Visualization was updated with given ID, if ID is not provided visualization is created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid visualization ID',
  })
  @UseGuards(JwtAuthGuard)
  async putVisualization(
    @Body() visualization: VisualizationDomain,
    @Req() request,
  ): Promise<any | IVisualizationDomainDTO> {
    if (typeof visualization.id !== 'number') {
      throw new HttpException(
        'Invalid visualization ID',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.visualizationService.putVisualization(
      visualization,
      request.user,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Visualization removed',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: `Visualization wasn't found.`,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: `Forbidden to remove visualization`,
  })
  async deleteVisualization(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() req,
  ): Promise<boolean> {
    return await this.visualizationService.deleteVisualization(id, req.user);
  }
}
