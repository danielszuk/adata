import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatrixModule } from 'src/modules/matrix/matrix.module';
import { DataBankWorldBankModule } from 'src/modules/databank-worldbank/databank-worldbank.module';
import { MatchModule } from 'src/modules/match/match.module';
import { VisualizationModule } from 'src/modules/visualization/visualization.module';
import { UserModule } from 'src/modules/user/user.module';
import { DimensionModule } from '../../modules/dimension/dimension.module';

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
