import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { DataBankWorldBankDomain } from './databank-worldbank.domain';
import { MatrixEntity } from '../matrix/matrix.entity';
import { DimensionEntity } from '../dimension/dimension.entity';
import { DataBankWorldBankDomainIntervals } from '../../shared/modules/databank-worldbank/databank-worldbank.domain';

@Entity('databank_wordbank')
export class DataBankWorldBankEntity extends DataBankWorldBankDomain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  apiUri: string;

  // YYYY-MM-DD format
  @Column()
  lastUpdated: string;

  @Column()
  uniqueNameQuery: string;

  @Column()
  nameQuery: string;

  @Column()
  interval: DataBankWorldBankDomainIntervals;

  @Column()
  dim1Query: string;

  @ManyToOne(type => DimensionEntity, u => u.id)
  @JoinColumn()
  dim1: DimensionEntity;

  @Column()
  dim2Query: string;

  @ManyToOne(type => DimensionEntity, u => u.id)
  dim2: DimensionEntity;

  @OneToMany(type => MatrixEntity, mE => mE.sync)
  matrices: MatrixEntity[];
}
