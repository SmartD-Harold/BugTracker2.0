import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Type } from 'class-transformer';

//  {
//     "UUID": "fe6554e0-d3bd-4125-be8c-37d242f77c68",
//     "Code": "P01-F001",
//     "ProjectId": 1,
//     "Project": "管理版Web",
//     "Name": "實名制註冊",
//     "Order": 1,
//     "Enabled": true
//   },

@Entity('project_functions')
export class BugtrackerProjectFunctionEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ unique: true })
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 36 })
  name: string;

  @Column({
    type: 'int',
    width: 11,
    nullable: true,
    unsigned: true,
    default: 0,
  })
  projectId: number;

  // P01-F001-S01-V01
  @Column({ type: 'varchar', length: 16, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 36 })
  project: string;

  @Column({ default: true })
  enabled: boolean;

  @Column({ type: 'int', width: 10, unsigned: true, default: 0 })
  order: number;

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
}
