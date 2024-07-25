import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Type } from 'class-transformer';

@Entity('azure_tasks')
export class BugtrackerAzureEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ type: 'int', width: 11, unsigned: true })
  bugId: number;

  @Column({ type: 'int', width: 11, unsigned: true })
  mantisBugId: number;

  @Column({ type: 'varchar', length: 32, nullable: true })
  statusId: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  statusLabel: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link: string;

  @Column({ type: 'bool', default: false })
  isClosed: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Exclude()
  @Type(() => Date)
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Exclude()
  @Type(() => Date)
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  @Type(() => Date)
  deletedAt?: Date;
}
