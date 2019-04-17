import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatrixModule } from '../matrix/matrix.module';
import { DimensionEntity } from './dimension.entity';
import { DimensionService } from './dimension.services';
import { DimensionController } from './dimension.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DimensionEntity]), MatrixModule],
  providers: [DimensionService],
  controllers: [DimensionController],
})
export class DimensionModule {}
