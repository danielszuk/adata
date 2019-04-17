import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MatrixEntity } from '../matrix/matrix.entity';
import { DataBankWorldBankEntity } from '../databank-worldbank/databank-worldbank.entity';
import { DimensionDomain } from './dimension.domain';
import { VisualizationEntity } from '../visualization/visualization.entity';

@Entity('dimension')
export class DimensionEntity extends DimensionDomain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  unit: string;

  @OneToMany(type => MatrixEntity, mxE => mxE.dim1)
  matrixByDim1: MatrixEntity[];

  @OneToMany(type => MatrixEntity, mxE => mxE.dim2)
  matrixByDim2: MatrixEntity[];

  @OneToMany(type => DataBankWorldBankEntity, dbwb => dbwb.dim1)
  dbwbByDim1: DataBankWorldBankEntity[];

  @OneToMany(type => DataBankWorldBankEntity, dbwb => dbwb.dim2)
  dbwbByDim2: DataBankWorldBankEntity[];

  @OneToMany(type => VisualizationEntity, v => v.x)
  x: VisualizationEntity[];

  @OneToMany(type => VisualizationEntity, v => v.y)
  y: VisualizationEntity[];

  @OneToMany(type => VisualizationEntity, v => v.y2)
  y2: VisualizationEntity[];
}
