import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Type } from 'class-transformer';

@Entity('urban_nexuses')
export class BugtrackerUrbanNexusEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  // 1: apartment_complexes, 2: construction_companies, 3: estate_managements
  @Column({ type: 'tinyint', nullable: true })
  type: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  targetId: string;

  @Column({ type: 'varchar', length: 36, nullable: true })
  code: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  note: string;

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

  @DeleteDateColumn({
    type: 'timestamp',
  })
  @Type(() => Date)
  deletedAt?: Date;
}
