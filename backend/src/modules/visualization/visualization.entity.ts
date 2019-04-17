import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { VisualizationDomain } from './visualization.domain';
import { UserEntity } from '../user/user.entity';
import { VisualizationMatrixEntity } from './visualization.matirx/visualization.matrix.entity';
import { DimensionEntity } from '../dimension/dimension.entity';

@Entity('visualization')
export class VisualizationEntity extends VisualizationDomain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(type => VisualizationMatrixEntity, vm => vm.visualization)
  matrices: VisualizationMatrixEntity[];

  @ManyToOne(type => UserEntity, user => user.visualizations)
  user: UserEntity;

  @ManyToOne(type => DimensionEntity, d => d.x)
  x: DimensionEntity;

  @ManyToOne(type => DimensionEntity, d => d.y)
  y: DimensionEntity;

  @ManyToOne(type => DimensionEntity, d => d.y2, { nullable: true })
  y2?: DimensionEntity;
}
