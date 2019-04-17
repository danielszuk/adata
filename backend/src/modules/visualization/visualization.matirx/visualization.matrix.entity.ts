import { PrimaryGeneratedColumn, Entity, ManyToOne, Column } from 'typeorm';

import { VisualizationMatrixDomain } from './visualization.matrix.domain';
import { MatrixEntity } from 'src/modules/matrix/matrix.entity';
import { Colors } from 'src/shared/enums/colors.enum';
import { VisualizationEntity } from '../visualization.entity';

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
