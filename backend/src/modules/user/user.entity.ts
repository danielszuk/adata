import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { VisualizationEntity } from '../visualization/visualization.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsEmail()
  email: string;

  @OneToMany(type => VisualizationEntity, visualization => visualization.user)
  visualizations: VisualizationEntity[];
}
