import { PrimaryGeneratedColumn, Entity, ManyToOne, Column } from 'typeorm';

import { VisualizationMatrixDomain } from './visualization.matrix.domain';
import { VisualizationEntity } from '../visualization.entity';
import { MatrixEntity } from '../../matrix/matrix.entity';
import { Colors } from '../../../shared/enums/colors.enum';

@Entity('visualization_matrix')
export class VisualizationMatrixEntity extends VisualizationMatrixDomain {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => VisualizationEntity, v => v.matrices)
  visualization: VisualizationEntity;

  @ManyToOne(type => MatrixEntity, m => m.visualizationMatrices)
  matrix: MatrixEntity;

  @Column()
  color: Colors;
}
