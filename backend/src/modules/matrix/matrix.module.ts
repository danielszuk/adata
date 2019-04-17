import { Module } from '@nestjs/common';
import { MatrixController } from './matrix.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatrixEntity } from 'src/modules/matrix/matrix.entity';
import { MatrixService } from './matrix.service';

@Module({
  imports: [TypeOrmModule.forFeature([MatrixEntity])],
  providers: [MatrixService],
  controllers: [MatrixController],
  exports: [MatrixService],
})
export class MatrixModule {}
