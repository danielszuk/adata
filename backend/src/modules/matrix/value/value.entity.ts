import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { MatrixEntity } from 'src/modules/matrix/matrix.entity';
import { ValueDomain } from './value.domain';

@Entity('value')
export class ValueEntity extends ValueDomain {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => MatrixEntity, mxe => mxe.id)
  matrix: MatrixEntity;

  @Column({ type: 'varchar', nullable: true })
  dim1: string;

  @Column({ type: 'varchar', nullable: true })
  dim2: string;
}
