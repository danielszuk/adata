import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { MatrixDomain } from './matrix.domain';
import { ValueEntity } from 'src/modules/matrix/value/value.entity';
import { DataBankWorldBankEntity } from '../databank-worldbank/databank-worldbank.entity';
import { DimensionEntity } from '../dimension/dimension.entity';
import { VisualizationMatrixEntity } from '../visualization/visualization.matirx/visualization.matrix.entity';

@Entity('matrix')
export class MatrixEntity extends MatrixDomain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uniqueName: string;

  @Column()
  name: string;

  @ManyToOne(type => DimensionEntity, uE => uE.matrixByDim1)
  dim1: DimensionEntity;

  @ManyToOne(type => DimensionEntity, uE => uE.matrixByDim2)
  dim2: DimensionEntity;

  @OneToMany(type => ValueEntity, vE => vE.matrix)
  values: ValueEntity[];

  @ManyToOne(type => DataBankWorldBankEntity, sE => sE.id)
  sync: DataBankWorldBankEntity;

  @OneToMany(type => VisualizationMatrixEntity, vm => vm.matrix)
  visualizationMatrices: VisualizationMatrixEntity[];
}
