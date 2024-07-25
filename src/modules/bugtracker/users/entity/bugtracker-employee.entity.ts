import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('employees')
export class BugtrackerEmployeeEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
  })
  code: number;

  @Column({ type: 'varchar', length: 12 })
  employeeId: string;

  @Column({ type: 'varchar', length: 191 })
  name: string;

  @Column({ type: 'varchar', length: 191 })
  email: string;

  @Column({ default: false })
  isCompanyEmail: boolean;

  @Column({ type: 'varchar', length: 32, nullable: true })
  department: string;

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
