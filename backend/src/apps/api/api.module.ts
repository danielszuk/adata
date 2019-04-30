import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DimensionModule } from '../../modules/dimension/dimension.module';
import { MatrixModule } from '../../modules/matrix/matrix.module';
import { DataBankWorldBankModule } from '../../modules/databank-worldbank/databank-worldbank.module';
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
      entities: [Env.DEV ? 'src/**/**.entity.ts' : '**/**.entity.js'],
      synchronize: true,
    }),
    MatrixModule,
    DimensionModule,
    DataBankWorldBankModule,
    VisualizationModule,
    UserModule,
  ],
})
export class ApiModule {}
