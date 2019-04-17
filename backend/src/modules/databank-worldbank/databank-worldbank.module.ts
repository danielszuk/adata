import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBankWorldBankEntity } from './databank-worldbank.entity';
import { DataBankWorldBankService } from './databank-worldbank.service';
import { DataBankWorldBankController } from './databank-worldbank.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DataBankWorldBankEntity])],
  providers: [DataBankWorldBankService],
  controllers: [DataBankWorldBankController],
})
export class DataBankWorldBankModule {}
