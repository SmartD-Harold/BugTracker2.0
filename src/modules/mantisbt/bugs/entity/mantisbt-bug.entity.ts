import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type, Transform, Exclude } from 'class-transformer';
import { ONE_SECOND, twDayjs } from 'src/utils/dayjs/dayjs';
import {
  ETA,
  ETAEnum,
  Priority,
  PriorityEnum,
  Projection,
  ProjectionEnum,
  Reproducibility,
  ReproducibilityEnum,
  Resolution,
  ResolutionEnum,
  Severity,
  SeverityEnum,
  SponsorshipTotal,
  SponsorshipTotalEnum,
  Status,
  StatusEnum,
  ViewStatue,
  ViewStatueEnum,
} from '../interfaces';
import { MantisbtUserEntity } from '../../users/entity/mantisbt-user.entity';
import { MantisbtUserMiniDto } from '../dto/mantisbt-user-mini.dto';
import { MantisbtBugTextEntity } from './mantisbt-bug-text.entity';
import { MantisbtProjectEntity } from '../../projects/entity/mantisbt-project.entity';
import { MantisbtCategoryEntity } from '../../categories/entity/mantisbt-category.entity';
import {
  BugNoteEnum,
  MantisbtBugNoteEntity,
  mantisbtBugNoteRelations,
} from './mantisbt-bug-note.entity';
import { MantisbtBugMonitorEntity } from './mantisbt-bug-monitor.entity';
import { MantisbtTagEntity } from './mantisbt-tag.entity';
import { MantisbtBugRelationshipEntity } from './mantisbt-bug-relationship.entity';

export const mantisbtBugCountKeys = {
  notesCount: 'notesCount',
};

export const mantisbtBugRelations = {
  reporter: 'reporter',
  handler: 'handler',
  bugText: 'bugText',
  project: 'project',
  category: 'category',
  notes: 'notes',
  monitors: 'monitors',
  tags: 'tags',
  bugsRelations: 'bugsRelations',
  byBugRelations: 'byBugsRelations',
};

export type BugNotesNoteEnum =
  | 'notes.bug'
  | 'notes.reporter'
  | 'notes.noteText';

export const mantisbtBugNotesRelations = {
  bug: [mantisbtBugRelations.notes, mantisbtBugNoteRelations.bug].join('.'),
  reporter: [
    mantisbtBugRelations.notes,
    mantisbtBugNoteRelations.reporter,
  ].join('.'),
  noteText: [
    mantisbtBugRelations.notes,
    mantisbtBugNoteRelations.noteText,
  ].join('.'),
} as {
  [key in BugNoteEnum]: BugNotesNoteEnum;
};

@Entity('mantis_bug_table')
export class MantisbtBugEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
  })
  projectId: number;

  @Type(() => MantisbtProjectEntity)
  @ManyToOne(() => MantisbtProjectEntity, {
    createForeignKeyConstraints: false,
  })
  project: MantisbtProjectEntity;

  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
  })
  reporterId: number;

  @Type(() => MantisbtUserMiniDto)
  @ManyToOne(() => MantisbtUserEntity, {
    createForeignKeyConstraints: false,
  })
  reporter: MantisbtUserMiniDto;

  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
  })
  handlerId: number;

  @Type(() => MantisbtUserMiniDto)
  @ManyToOne(() => MantisbtUserEntity, {
    createForeignKeyConstraints: false,
  })
  handler: MantisbtUserMiniDto;

  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
  })
  duplicateId: number;

  // '10:none,20:low,30:normal,40:high,50:urgent,60:immediate';
  // '10:無,20:低,30:一般,40:高,50:緊急,60:立即';
  @Type(() => Priority)
  @Transform(({ value }) => PriorityEnum[value])
  @Column({ type: 'smallint', width: 6, default: 30 })
  priority: number;

  // '10:feature,20:trivial,30:text,40:tweak,50:minor,60:major,70:crash,80:block';
  // '10:新功能,20:細節,30:文字,40:調整,50:次要,60:重要,70:當機,80:沒有反應';
  @Type(() => Severity)
  @Transform(({ value }) => SeverityEnum[value])
  @Column({ type: 'smallint', width: 6, default: 50 })
  severity: number;

  // '10:always,30:sometimes,50:random,70:have not tried,90:unable to reproduce,100:N/A';
  // '10:持續,30:時常,50:隨機,70:尚未嘗試,90:無法重現,100:不適用';
  @Type(() => Reproducibility)
  @Transform(({ value }) => ReproducibilityEnum[value])
  @Column({ type: 'smallint', width: 6, default: 10 })
  reproducibility: number;

  // '10:new,20:feedback,30:acknowledged,40:confirmed,50:assigned,80:resolved,90:closed';
  // '10:新問題,20:需要回覆,30:已接受,40:已確認,50:已分配,80:已解決,90:已結束';
  @Type(() => Status)
  @Transform(({ value }) => StatusEnum[value])
  @Column({ type: 'smallint', width: 6, default: 10 })
  status: number;

  // '10:open,20:fixed,30:reopened,40:unable to reproduce,50:not fixable,60:duplicate,70:no change required,80:suspended,90:won\'t fix';
  // '10:尚未分析,20:已修正,30:已重啟,40:無法重現,50:無法修復,60:重複問題,70:無須修正,80:暫緩處理,90:不做處理';
  @Type(() => Resolution)
  @Transform(({ value }) => ResolutionEnum[value])
  @Column({ type: 'smallint', width: 6, default: 10 })
  resolution: number;

  // $s_projection_enum_string = '10:none,30:tweak,50:minor fix,70:major rework,90:redesign';
  // $s_projection_enum_string = '10:沒有,30:些微調整,50:小幅修正,70:重要修正,90:重新設計';
  @Type(() => Projection)
  @Transform(({ value }) => ProjectionEnum[value])
  @Column({ type: 'smallint', width: 6, default: 10 })
  projection: number;

  // '10:none,20:< 1 day,30:2-3 days,40:< 1 week,50:< 1 month,60:> 1 month';
  // '10:無,20:< 1 天,30:2-3 天,40:< 一星期,50:< 一個月,60:> 一個月';
  @Exclude()
  @Type(() => ETA)
  @Transform(({ value }) => ETAEnum[value])
  @Column({ type: 'smallint', width: 6, default: 10 })
  eta: number;

  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
  })
  bugTextId: number;

  @Type(() => MantisbtBugTextEntity)
  @OneToOne(() => MantisbtBugTextEntity, (bugText) => bugText.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn() // @JoinColumn({ name: 'bug_text_id', referencedColumnName: 'id' })
  bugText: MantisbtBugTextEntity;

  // @Column({ type: 'varchar', length: 32, default: '' })
  // os: string;
  //
  // @Column({ type: 'varchar', length: 32, default: '' })
  // osBuild: string;
  //
  // @Column({ type: 'varchar', length: 32, default: '' })
  // platform: string;
  //
  // @Column({ type: 'varchar', length: 32, default: '' })
  // build: string;

  @Column({ type: 'varchar', length: 64, default: '' })
  version: string;

  @Column({ type: 'varchar', length: 64, default: '' })
  fixedInVersion: string;

  @Column({ type: 'varchar', length: 64, default: '' })
  targetVersion: string;

  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
    nullable: true,
  })
  profileId: number;

  // '10:public,50:private';
  // '10:公開,50:非公開';
  @Type(() => ViewStatue)
  @Transform(({ value }) => ViewStatueEnum[value])
  @Column({ type: 'smallint', width: 6, default: 10 })
  viewState: number;

  @Column({ type: 'varchar', length: 128 })
  summary: string;

  // '0:Unpaid,1:Requested,2:Paid';
  // '0:未付款,1:已請求支付,2:已付款';
  @Exclude()
  @Type(() => SponsorshipTotal)
  @Transform(({ value }) => SponsorshipTotalEnum[value])
  @Column({ type: 'int', width: 11, default: 0 })
  sponsorshipTotal: number;

  @Type(() => Boolean)
  @Transform(({ value }) => !!value)
  @Column({ type: 'tinyint', width: 4, default: 0 })
  sticky: number; // 置頂

  @Column({ type: 'int', width: 10, unsigned: true, default: 1 })
  categoryId: number;

  @Type(() => MantisbtCategoryEntity)
  @ManyToOne(() => MantisbtCategoryEntity, {
    createForeignKeyConstraints: false,
  })
  category: MantisbtCategoryEntity;

  @Type(() => Date || String)
  @Transform(({ value }) =>
    value === 0 ? '' : twDayjs(value * ONE_SECOND).toDate(),
  )
  @Column({ type: 'int', width: 10, unsigned: true, default: 1 })
  dateSubmitted: number;

  @Exclude()
  @Column({ type: 'int', width: 10, unsigned: true, default: 1 })
  dueDate: number;

  @Type(() => Date || String)
  @Transform(({ value }) =>
    value === 0 ? '' : twDayjs(value * ONE_SECOND).toDate(),
  )
  @Column({ type: 'int', width: 10, unsigned: true, default: 1 })
  lastUpdated: number;

  // @JoinColumn({ name: 'id', referencedColumnName: 'bugId' })
  @Type(() => MantisbtBugNoteEntity)
  @OneToMany(() => MantisbtBugNoteEntity, (bugNotes) => bugNotes.bug, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  notes: MantisbtBugNoteEntity[];

  @Type(() => MantisbtBugMonitorEntity)
  @OneToMany(() => MantisbtBugMonitorEntity, (bugNotes) => bugNotes.bug, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  monitors: MantisbtBugMonitorEntity[];

  @ManyToMany(() => MantisbtTagEntity)
  @JoinTable({
    name: 'mantis_bug_tag_table', // table name for the junction table of this relation
    joinColumn: {
      name: 'bug_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: MantisbtTagEntity[];

  @Type(() => MantisbtBugRelationshipEntity)
  @OneToMany(
    () => MantisbtBugRelationshipEntity,
    (bugRelation) => bugRelation.sourceBugs,
    {
      createForeignKeyConstraints: false,
    },
  )
  @JoinColumn()
  bugsRelations: MantisbtBugRelationshipEntity[];

  @Type(() => MantisbtBugRelationshipEntity)
  @OneToMany(
    () => MantisbtBugRelationshipEntity,
    (bugRelation) => bugRelation.destinationBugs,
    {
      createForeignKeyConstraints: false,
    },
  )
  @JoinColumn()
  byBugsRelations: MantisbtBugRelationshipEntity[];
}

// nest g module modules/main/azure --no-spec
// nest g controller modules/main/azure --no-spec
// nest g service modules/main/azure --no-spec
// nest g service modules/main/azure/azure-repository --no-spec --flat

// nest g module modules/main/categories --no-spec
// nest g controller modules/main/categories --no-spec
// nest g service modules/main/categories --no-spec
