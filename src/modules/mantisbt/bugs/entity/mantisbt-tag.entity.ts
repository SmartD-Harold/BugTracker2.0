import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MantisbtBugEntity } from './mantisbt-bug.entity';
import { Exclude } from 'class-transformer';

export const mantisbtTagRelations = {
  bugs: 'bugs',
};

@Entity('mantis_tag_table')
export class MantisbtTagEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Exclude()
  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
  })
  userId: number;

  @Column({ type: 'varchar', length: 100, default: '' })
  name: string;

  @Column({ type: 'longtext', default: '' })
  description: string;

  @Exclude()
  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 1,
  })
  dateCreated: number;

  @Exclude()
  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 1,
  })
  dateUpdated: number;

  @ManyToMany(() => MantisbtBugEntity)
  @JoinTable({
    name: 'mantis_bug_tag_table', // table name for the junction table of this relation
    joinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'bug_id',
      referencedColumnName: 'id',
    },
  })
  bugs: MantisbtBugEntity[];
}
