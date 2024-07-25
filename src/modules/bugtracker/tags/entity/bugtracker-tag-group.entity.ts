import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BugtrackerTagEntity } from './bugtracker-tag.entity';
import { Exclude, Type } from 'class-transformer';

export const BugtrackerTagGroupRelationEnum = {
  TAGS: 'tags',
};

export const defaultTagGroups = {
  ALL: {
    id: 1,
    code: 'ALL',
    name: '全部',
  },
  CSP: {
    id: 2,
    code: 'CSP',
    name: '客服人員',
  },
  QAE: {
    id: 3,
    code: 'QAE',
    name: '品保人員',
  },
};

@Entity('tag_groups')
export class BugtrackerTagGroupEntity {
  // 1: ALL/全部
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  // CSP: 客服人員, QAE: 品保人員
  @Column({ type: 'varchar', length: 12 })
  code: string;

  @Column({ type: 'varchar', length: 36 })
  name: string;

  @Type(() => BugtrackerTagEntity)
  @OneToMany(() => BugtrackerTagEntity, (tag) => tag.tagGroup, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  tags: BugtrackerTagEntity[];

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

  @Exclude()
  @DeleteDateColumn({
    type: 'timestamp',
  })
  @Type(() => Date)
  deletedAt?: Date;
}
