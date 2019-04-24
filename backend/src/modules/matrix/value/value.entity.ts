import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { ValueDomain } from './value.domain';
import { MatrixEntity } from '../matrix.entity';

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
