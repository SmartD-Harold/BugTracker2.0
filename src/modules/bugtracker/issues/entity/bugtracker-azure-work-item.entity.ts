import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Type } from 'class-transformer';
import { BugtrackerIssueEntity } from './bugtracker-issue.entity';

@Entity('azure_work_items')
@Unique('unique_azure_id', ['azureId'])
export class BugtrackerAzureWorkItemEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @PrimaryColumn({
    type: 'int',
    width: 11,
    unsigned: true,
    unique: true,
    comment: 'id',
  })
  azureId: number;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    comment: 'send:api.param:organization',
  })
  azureOrg: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    comment: 'send:api.param:project',
  })
  azureProject: string;

  @Column({ type: 'int', width: 11, unsigned: true, comment: 'rev' })
  rev: number;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    comment: 'System.AreaPath',
  })
  areaPath: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    comment: 'System.TeamProject',
  })
  teamProject: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    comment: 'System.IterationPath',
  })
  iterationPath: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    comment: 'System.WorkItemType',
  })
  workItemType: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
    comment: 'System.State',
  })
  state: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'System.Reason',
  })
  reason: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'System.Title',
  })
  title: string;

  @Column({ type: 'text', nullable: true, comment: 'System.Description' })
  description: string;

  @Column({
    type: 'int',
    width: 11,
    unsigned: true,
    default: 0,
    comment: 'System.CommentCount',
  })
  commentCount: number;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    comment: 'System.AssignedTo.displayName',
  })
  assignedToName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'System.AssignedTo.uniqueName',
  })
  assignedToEmail: string;

  @Column({
    type: 'timestamp',
    precision: 3,
    nullable: true,
    comment: 'System.CreatedDate',
  })
  createdDate: Date;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    comment: 'System.CreatedBy.displayName',
  })
  createdByName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'System.CreatedBy.uniqueName',
  })
  createdByEmail: string;

  @Column({
    type: 'timestamp',
    precision: 3,
    nullable: true,
    comment: 'System.ChangedDate',
  })
  changedDate: Date;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    comment: 'System.CreatedBy.displayName',
  })
  changedByName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'System.CreatedBy.uniqueName',
  })
  changedByEmail: string;

  @Column({
    type: 'timestamp',
    precision: 3,
    nullable: true,
    comment: 'System.StateChangeDate',
  })
  stateChangeDate: Date;

  @Column({
    type: 'timestamp',
    precision: 3,
    nullable: true,
    comment: 'Microsoft.VSTS.Scheduling.TargetDate',
  })
  targetDate: Date;

  @Column({
    type: 'int',
    width: 11,
    unsigned: true,
    comment: 'System.Priority',
  })
  priority: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'System.BoardColumn',
  })
  boardColumn: string;

  @Column({
    type: 'bool',
    default: false,
    comment: 'System.BoardColumnDone',
  })
  boardColumnDone: boolean;

  @Column({
    type: 'text',
    nullable: true,
    comment: '_links.html',
  })
  link: string;

  @Column({ type: 'text', nullable: true, comment: 'url' })
  url: string;

  @Column({
    type: 'timestamp',
    precision: 3,
    nullable: true,
    comment: 'System.ActivatedDate',
  })
  activatedDate: Date;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    comment: 'System.ActivatedBy.displayName',
  })
  activatedByName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'System.ActivatedBy.uniqueName',
  })
  activatedByEmail: string;

  @Column({
    type: 'timestamp',
    precision: 3,
    nullable: true,
    comment: 'Microsoft.VSTS.Common.ClosedDate',
  })
  closedDate: Date;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    comment: 'Microsoft.VSTS.Common.ClosedBy.displayName',
  })
  closedByName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Microsoft.VSTS.Common.ClosedBy.uniqueName',
  })
  closedByEmail: string;

  @Column({ type: 'text', nullable: true, comment: 'send:api.url' })
  sendApiUrl: string;

  @Column({
    type: 'varchar',
    length: 12,
    nullable: true,
    comment: 'send:api.method',
  })
  sendApiMethod: string;

  @ManyToMany(() => BugtrackerIssueEntity, (bug) => bug.azureWorkItems)
  bugs: BugtrackerIssueEntity[];

  @Column({
    type: 'timestamp',
    precision: 3,
    nullable: true,
  })
  @Type(() => Date)
  expiredAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Type(() => Date)
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Type(() => Date)
  updatedAt: Date;
}
