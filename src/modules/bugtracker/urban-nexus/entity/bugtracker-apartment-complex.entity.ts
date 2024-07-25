import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('apartment_complexes')
export class BugtrackerApartmentComplexEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
  })
  code: number;

  @Column({ type: 'varchar', length: 64, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ default: true })
  enabled: boolean;

  @Column({ type: 'varchar', length: 16, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  dist: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  postCode: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  phone: string;

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
