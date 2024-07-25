import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose, Transform, Type } from 'class-transformer';
import { BugRelationship, BugRelationshipInterfaceEnum } from '../interfaces';
import { MantisbtBugEntity } from './mantisbt-bug.entity';

export const mantisbtBugRelationshipRelations = {
  sourceBugs: 'sourceBugs',
  destinationBugs: 'destinationBugs',
};

@Entity('mantis_bug_relationship_table')
export class MantisbtBugRelationshipEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
  })
  sourceBugId: number;

  @Type(() => MantisbtBugEntity)
  @ManyToOne(() => MantisbtBugEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'source_bug_id' })
  sourceBugs: MantisbtBugEntity;

  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
  })
  destinationBugId: number;

  @Type(() => MantisbtBugEntity)
  @ManyToOne(() => MantisbtBugEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'destination_bug_id' })
  destinationBugs: MantisbtBugEntity;

  // 0: duplicate_of, 1: related_to, 2: dependant_on, 3: blocks, 4: has_duplicate
  // 0: 重複下列問題, 1:與下列問題相關, 2:為下列問題的父問題, 3:為下列問題的子問題 4: 有重複下列問題
  @Type(() => BugRelationship)
  @Transform(({ value }) => BugRelationshipInterfaceEnum[value])
  @Column({ type: 'smallint', width: 6, default: 10 })
  relationshipType: number;
}
