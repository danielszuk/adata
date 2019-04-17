import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/modules/user/user.entity';

@Entity('user_google_profile')
export class GoogleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'json' })
  profile: any;

  @OneToOne(type => UserEntity, userEntity => userEntity.id)
  @JoinColumn()
  user: UserEntity;
}
