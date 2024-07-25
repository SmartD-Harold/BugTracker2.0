import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MantisbtTaskStatusEnum } from '../types/mantisbt-task-status.enum';

@Entity('tasks')
export class MantisbtTasksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: MantisbtTaskStatusEnum;
}
