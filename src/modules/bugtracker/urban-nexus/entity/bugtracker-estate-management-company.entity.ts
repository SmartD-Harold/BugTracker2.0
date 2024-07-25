import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('estate_management_companies')
export class BugtrackerEstateManagementCompanyEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
  })
  code: number;

  @Column({ type: 'varchar', length: 64, nullable: true })
  name: string;

  @Column({ default: true })
  enabled: boolean;

  @Column({ type: 'varchar', length: 16, nullable: true })
  city: string;

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
