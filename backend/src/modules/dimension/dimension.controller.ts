import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ApiResponse } from '@nestjs/swagger';
import { DimensionDomain } from './dimension.domain';
import { DimensionService } from './dimension.services';
import { IDimensionDTO } from '../../shared/modules/dimension/dimension.dto';
import { JwtAdminGuard } from '../user/auth/jwt/jwt.admin.guard';

@Controller('dimension')
export class DimensionController {
  constructor(readonly dimensionService: DimensionService) {}

  @Post()
  @UseGuards(JwtAdminGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Dimension created. Return with the created dimension.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Dimension name already exists',
  })
  async insertDimension(
    @Body() dimension: DimensionDomain,
  ): Promise<IDimensionDTO> {
    return await this.dimensionService.insertDimension(dimension);
  }

  @Put()
  @UseGuards(JwtAdminGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dimension updated.',
  })
  async updateDimension(@Body() dimension: DimensionDomain) {
    await this.dimensionService.updateDimension(dimension);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all Dimensions with details',
  })
  async getAllDimensionsWithDetails(): Promise<IDimensionDTO[]> {
    return await this.dimensionService.getAllDimensionsWithDetails();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return a Dimension',
  })
  async selectDimensionById(@Param('id') id): Promise<any> {
    return await this.dimensionService.selectDimensionById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAdminGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dimension deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dimension has relations',
  })
  async deleteDimensionById(@Param('id') id: number): Promise<any> {
    return await this.dimensionService.deleteDimensionById(id);
  }
}
