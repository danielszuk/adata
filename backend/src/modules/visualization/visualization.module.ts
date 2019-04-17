import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VisualizationController } from './visualization.controller';
import { VisualizationService } from './visualization.service';
import { VisualizationEntity } from './visualization.entity';
import { MatrixModule } from '../matrix/matrix.module';

@Module({
  imports: [TypeOrmModule.forFeature([VisualizationEntity]), MatrixModule],
  controllers: [VisualizationController],
  providers: [VisualizationService],
})
export class VisualizationModule {}
