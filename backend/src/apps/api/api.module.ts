import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DimensionModule } from '../../modules/dimension/dimension.module';
import { MatrixModule } from '../../modules/matrix/matrix.module';
import { DataBankWorldBankModule } from '../../modules/databank-worldbank/databank-worldbank.module';
import { MatchModule } from '../../modules/match/match.module';
import { VisualizationModule } from '../../modules/visualization/visualization.module';
import { UserModule } from '../../modules/user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MatrixModule,
    DimensionModule,
    DataBankWorldBankModule,
    MatchModule,
    VisualizationModule,
    UserModule,
  ],
})
export class ApiModule {}
