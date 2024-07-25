import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transform, Type } from 'class-transformer';
import { ViewStatue, ViewStatueEnum } from '../interfaces';
import { ONE_SECOND, twDayjs } from '../../../../utils/dayjs/dayjs';
import { MantisbtUserMiniDto } from '../dto/mantisbt-user-mini.dto';
import { MantisbtUserEntity } from '../../users/entity/mantisbt-user.entity';
import { MantisbtBugEntity } from './mantisbt-bug.entity';
import { MantisbtBugNoteTextEntity } from './mantisbt-bug-note-text.entity';

export type BugNoteEnum = 'bug' | 'reporter' | 'noteText';

export const mantisbtBugNoteRelations: {
  [key in BugNoteEnum]: string;
} = {
  bug: 'bug',
  reporter: 'reporter',
  noteText: 'noteText',
};

@Entity('mantis_bugnote_table')
export class MantisbtBugNoteEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ type: 'int', width: 10, unsigned: true, default: 0 })
  bugId: number;

  @Type(() => MantisbtBugEntity)
  @ManyToOne(() => MantisbtBugEntity, {
    createForeignKeyConstraints: false,
  })
  bug: MantisbtBugEntity;

  @Column({ type: 'int', width: 10, unsigned: true, default: 0 })
  reporterId: number;

  @Type(() => MantisbtUserEntity)
  @ManyToOne(() => MantisbtUserEntity, {
    createForeignKeyConstraints: false,
  })
  reporter: MantisbtUserEntity;

  @Column({ type: 'int', width: 10, unsigned: true, default: 0 })
  bugnoteTextId: number;

  @Type(() => MantisbtBugNoteTextEntity)
  @OneToOne(() => MantisbtBugNoteTextEntity, (bugTextNote) => bugTextNote.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'bugnote_text_id', referencedColumnName: 'id' })
  noteText: MantisbtBugNoteTextEntity;

  // '10:public,50:private';
  // '10:公開,50:非公開';
  @Type(() => ViewStatue)
  @Transform(({ value }) => ViewStatueEnum[value])
  @Column({ type: 'smallint', width: 6, default: 10 })
  viewState: number;

  @Column({ type: 'int', width: 11, nullable: true, default: 0 })
  noteType: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  noteAttr: string;

  @Type(() => Date || String)
  @Transform(({ value }) =>
    value === 0 ? '' : twDayjs(value * ONE_SECOND).toDate(),
  )
  @Column({ type: 'int', width: 10, unsigned: true, default: 1 })
  timeTracking: number;

  @Type(() => Date || String)
  @Transform(({ value }) =>
    value === 0 ? '' : twDayjs(value * ONE_SECOND).toDate(),
  )
  @Column({ type: 'int', width: 10, unsigned: true, default: 1 })
  lastModified: number;

  @Type(() => Date || String)
  @Transform(({ value }) =>
    value === 0 ? '' : twDayjs(value * ONE_SECOND).toDate(),
  )
  @Column({ type: 'int', width: 10, unsigned: true, default: 1 })
  dateSubmitted: number;
}
