import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Type } from 'class-transformer';
import { BugtrackerUserEntity } from './bugtracker-user.entity';

@Entity('departments')
export class BugtrackerDepartmentEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  // BD | RD
  @Column({ type: 'varchar', length: 12 })
  code: string;

  @Column({ type: 'varchar', length: 12 })
  name: string;

  @Column({ type: 'int', width: 11, unsigned: true, nullable: true })
  supervisorUserId: number;

  @ManyToOne(() => BugtrackerUserEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'supervisorUserId', referencedColumnName: 'id' })
  supervisorUser: BugtrackerUserEntity;

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

  @DeleteDateColumn({
    type: 'timestamp',
  })
  @Type(() => Date)
  deletedAt?: Date;
}
