import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('employees_departments')
export class BugtrackerEmployeeDepartmentsEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @PrimaryColumn({
    type: 'varchar',
    length: 32,
  })
  code: string;

  @Column({ type: 'varchar', length: 32 })
  name: string;

  @Column({ type: 'int', width: 11, unsigned: true, default: 0 })
  members: number;

  @Column({ type: 'varchar', length: 191 })
  supervisorEmail: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  supervisorName: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Exclude()
  updatedAt: Date;
}
