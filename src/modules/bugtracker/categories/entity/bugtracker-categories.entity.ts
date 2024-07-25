import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Type } from 'class-transformer';

@Entity('categories')
export class BugtrackerCategoriesEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ type: 'int', width: 10, unsigned: true, default: 0 })
  projectId: number;

  @Column({ type: 'int', width: 10, unsigned: true, default: 0 })
  mantisbtCategoryId: number;

  @Column({ type: 'varchar', length: 128, default: '' })
  name: string;

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
