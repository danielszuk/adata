import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Delete,
  Query,
  HttpException,
  UseGuards,
} from '@nestjs/common';

import { DataBankWorldBankService } from './databank-worldbank.service';
import { DataBankWorldBankDomain } from './databank-worldbank.domain';
import { ApiResponse } from '@nestjs/swagger';
import { IDataBankWorldBankDTO } from '../../shared/modules/databank-worldbank/databank-worldbank.dto';
import { IChannelInfoDTO } from '../../shared/dtos/channel-info.dto';
import { JwtAuthGuard } from '../user/auth/jwt/jwt.guard';
import { JwtAdminGuard } from '../user/auth/jwt/jwt.admin.guard';

@Controller('databank-worldbank')
export class DataBankWorldBankController {
  constructor(readonly dbwbService: DataBankWorldBankService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'DataBankWorldBank Sync inserted, return with it',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'DataBankWorldBank Sync apiUri already exists',
  })
  async insertSync(
    @Body() sync: DataBankWorldBankDomain,
  ): Promise<DataBankWorldBankDomain> {
    return await this.dbwbService.insertSync(sync);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all DataBankWorldBank Sync',
  })
  async getSyncs(): Promise<IDataBankWorldBankDTO[]> {
    return await this.dbwbService.getAll();
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return info about the given DataBankWorldBank Api Uri',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'No Uri given',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Havent found DataBankWorldBank API for the given Uri',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'No data in the API.',
  })
  async getInfo(@Query('uri') uri: string): Promise<IChannelInfoDTO> {
    if (!uri) {
      throw new HttpException('Uri is required.', HttpStatus.BAD_REQUEST);
    }
    return await this.dbwbService.getChannelInfo(uri);
  }

  @Delete(':id')
  @UseGuards(JwtAdminGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The DataBankWorldBank Sync removed',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The DataBankWorldBank Entity has relations',
  })
  async removeSync(@Param('id') id: string): Promise<void> {
    return await this.dbwbService.removeSync(Number.parseInt(id, 10));
  }

  @Get('start/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'Sync completed. Return affected matrices or null if channel already synchronized with the latest version.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Sync not found',
  })
  async startSyncById(@Param('id') id: number): Promise<number> {
    return await this.dbwbService.startSyncById(id);
  }
}
