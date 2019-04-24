import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DimensionModule } from '../../modules/dimension/dimension.module';
import { MatrixModule } from '../../modules/matrix/matrix.module';
import { DataBankWorldBankModule } from '../../modules/databank-worldbank/databank-worldbank.module';
import { MatchModule } from '../../modules/match/match.module';
import { VisualizationModule } from '../../modules/visualization/visualization.module';
import { UserModule } from '../../modules/user/user.module';
import { Env } from '../../modules/util/env/variables';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Env.POSTGRES_HOST,
      port: Env.POSTGRES_PORT,
      username: Env.POSTGRES_USER,
      password: Env.POSTGRES_PASSWORD,
      database: Env.POSTGRES_DB,
      entities: ['../../**/**.entity{.ts,.js}'],
      synchronize: true,
    }),
    MatrixModule,
    DimensionModule,
    DataBankWorldBankModule,
    MatchModule,
    VisualizationModule,
    UserModule,
  ],
})
export class ApiModule {}
