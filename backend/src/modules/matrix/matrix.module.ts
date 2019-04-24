import { Module } from '@nestjs/common';
import { MatrixController } from './matrix.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatrixService } from './matrix.service';
import { MatrixEntity } from './matrix.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatrixEntity])],
  providers: [MatrixService],
  controllers: [MatrixController],
  exports: [MatrixService],
})
export class MatrixModule {}
