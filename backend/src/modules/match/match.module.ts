import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MatrixEntity } from '../matrix/matrix.entity';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { MatrixModule } from '../matrix/matrix.module';
import { DimensionEntity } from '../dimension/dimension.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MatrixEntity, DimensionEntity]),
    MatrixModule,
  ],
  providers: [MatchService],
  controllers: [MatchController],
})
export class MatchModule {}
