import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Transform, Type } from 'class-transformer';
import { BugtrackerAzureEntity } from './bugtracker-azure.entity';
import { BugtrackerProjectFunctionEntity } from '../../project-functions/entity/bugtracker-project-function.entity';
import { BugtrackerApartmentComplexEntity } from '../../urban-nexus/entity/bugtracker-apartment-complex.entity';
import { BugtrackerEstateManagementCompanyEntity } from '../../urban-nexus/entity/bugtracker-estate-management-company.entity';
import { BugtrackerConstructionCompanyEntity } from '../../urban-nexus/entity/bugtracker-construction-company.entity';
import { BugtrackerRoleEntity } from '../../users/entity/bugtracker-role.entity';
import { BugtrackerUserEntity } from '../../users/entity/bugtracker-user.entity';
import {
  Status,
  StatusEnum,
  StatusKeyEnum,
  SubStatus,
  SubStatusEnum,
  SubStatusKeyEnum,
} from '../../../mantisbt/bugs/interfaces';

import { ServiceTargetType, serviceTargetTypeEnum } from '../interfaces';
import { BugtrackerCategoriesEntity } from '../../categories/entity/bugtracker-categories.entity';
import { BugtrackerProjectEntity } from '../../projects/entity/bugtracker-project.entity';
import { BugtrackerIssueFilesEntity } from './bugtracker-issue-files.entity';
import { BugtrackerAzureWorkItemEntity } from './bugtracker-azure-work-item.entity';

export enum IssueRelationEnum {
  APARTMENT_COMPLEX = 'apartmentComplex',
  ESTATE_MANAGEMENT = 'estateManagementCompany',
  CONSTRUCTION_COMPANY = 'constructionCompany',
  PROJECT_FUNCTION = 'projectFunction',
  AZURE_TASKS = 'azureTasks',
  HANDLER_ROLE = 'handlerRole',
  HANDLER_ROLE_USERS = 'handlerRole.users',
  HANDLER_USER = 'handlerUser',
  HANDLER_USER_EMPLPOYEE = 'handlerUser.employee',
  REPORTER_USER = 'reporterUser',
  REPORTER_USER_EMPLPOYEE = 'reporterUser.employee',
  PROJECT = 'project',
  CATEGORY = 'category',
  ATTACH_FILES = 'attachFiles',
  AZURE_WORK_ITEMS = 'azureWorkItems',
}

export enum BugtrackerIssueHandlerTypeEnum {
  USER = 'USER',
  ROLE = 'ROLE',
  DEPT = 'DEPT',
}

@Entity('bugs')
export class BugtrackerIssueEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ unique: true })
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'int', width: 10, unsigned: true })
  mantisBugId: number;

  @Column({ type: 'int', width: 10, unsigned: true, default: 0 })
  projectId: number;

  @ManyToOne(() => BugtrackerProjectEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  project: BugtrackerProjectEntity;

  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
  })
  reporterUserId: number;

  @ManyToOne(() => BugtrackerUserEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  reporterUser: BugtrackerUserEntity;

  @Type(() => Status)
  @Transform(({ value }) => StatusEnum[value])
  @Column({ type: 'smallint', width: 6, default: StatusKeyEnum.new_10 })
  statueCode: number;

  @Type(() => SubStatus)
  @Transform(({ value }) => SubStatusEnum[value])
  @Column({
    type: 'smallint',
    width: 6,
    default: SubStatusKeyEnum.new_10,
  })
  subStatueCode: number;

  // USER | ROLE | DEPT
  @Column({ type: 'char', length: 4, nullable: true })
  handlerType: string;

  @Column({ type: 'int', width: 11, nullable: true, unsigned: true })
  handlerDeptId: number;

  @Column({ type: 'int', width: 11, nullable: true, unsigned: true })
  handlerRoleId: number;

  @ManyToOne(() => BugtrackerRoleEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  handlerRole: BugtrackerRoleEntity;

  @Column({ type: 'int', width: 11, nullable: true, unsigned: true })
  handlerUserId: number;

  @ManyToOne(() => BugtrackerUserEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  handlerUser: BugtrackerUserEntity;

  @Column({ type: 'int', width: 10, unsigned: true, nullable: true })
  categoryId: number;

  @ManyToOne(() => BugtrackerCategoriesEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  category: BugtrackerCategoriesEntity;

  @Column({ type: 'varchar', length: 32, nullable: true })
  deviceName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deviceNote: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  version: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  targetVersion: string;

  @OneToOne(() => BugtrackerAzureEntity, (azureEntity) => azureEntity.bugId)
  @JoinColumn()
  azureTasks: BugtrackerAzureEntity;

  @Type(() => ServiceTargetType)
  @Column({ type: 'smallint', width: 6, nullable: true })
  @Transform(({ value }) => serviceTargetTypeEnum[value])
  serviceTargetType: number;

  @Column({ type: 'int', width: 10, unsigned: true, nullable: true })
  apartmentComplexId: number;

  @ManyToOne(() => BugtrackerApartmentComplexEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  apartmentComplex: BugtrackerApartmentComplexEntity;

  @Column({ type: 'int', width: 10, unsigned: true, nullable: true })
  estateManagementCompanyId: number;

  @ManyToOne(() => BugtrackerEstateManagementCompanyEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  estateManagementCompany: BugtrackerEstateManagementCompanyEntity;

  @Column({ type: 'int', width: 10, unsigned: true, nullable: true })
  constructionCompanyId: number;

  @ManyToOne(() => BugtrackerConstructionCompanyEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  constructionCompany: BugtrackerConstructionCompanyEntity;

  @Column({ type: 'int', width: 10, unsigned: true, nullable: true })
  projectFunctionId: number;

  @ManyToOne(() => BugtrackerProjectFunctionEntity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  projectFunction: BugtrackerProjectFunctionEntity;

  @Type(() => BugtrackerIssueFilesEntity)
  @OneToMany(
    () => BugtrackerIssueFilesEntity,
    (bugIssueFile) => bugIssueFile.bug,
    {
      createForeignKeyConstraints: false,
    },
  )
  @JoinColumn()
  attachFiles: BugtrackerIssueFilesEntity[];

  @ManyToMany(() => BugtrackerAzureWorkItemEntity, {
    cascade: true,
  })
  @JoinTable({
    name: 'bugs_azure_work_items', // table name for the junction table of this relation
    joinColumn: {
      name: 'bug_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'azure_work_item_azure_id',
      referencedColumnName: 'azureId',
    },
  })
  azureWorkItems: BugtrackerAzureWorkItemEntity[];

  @Column({ type: 'timestamp', nullable: true })
  @Type(() => Date)
  expiresAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Type(() => Date)
  archiveAt: Date;

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
