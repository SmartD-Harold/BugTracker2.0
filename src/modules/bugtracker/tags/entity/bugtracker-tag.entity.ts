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
import {
  BugtrackerTagGroupEntity,
  defaultTagGroups,
} from './bugtracker-tag-group.entity';
import { Exclude, Type } from 'class-transformer';

export const BugtrackerTagRelationEnum = {
  TAG_GROUP: 'tagGroup',
};

@Entity('tags')
export class BugtrackerTagEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ type: 'int', width: 10, unsigned: true })
  mantisbtTagId: number;

  @Column({ type: 'varchar', length: 36 })
  name: string;

  // 1: ALL/全部
  @Column({
    type: 'int',
    width: 10,
    default: defaultTagGroups.ALL.id,
    unsigned: true,
  })
  tagGroupId: number;

  @Type(() => BugtrackerTagGroupEntity)
  @ManyToOne(() => BugtrackerTagGroupEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  tagGroup: BugtrackerTagGroupEntity;

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
