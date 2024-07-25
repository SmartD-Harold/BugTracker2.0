import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type, Transform, Exclude } from 'class-transformer';
import {
  AccessLevel,
  AccessLevelTypeEnum,
  ProjectStatus,
  ProjectStatusEnum,
  ProjectViewStatue,
  ProjectViewStatueEnum,
} from '../interfaces';
import { MantisbtCategoryEntity } from '../../categories/entity/mantisbt-category.entity';
import { MantisbtProjectUserListEntity } from './mantisbt-project-user-list.entity';

export const mantisbtProjectRelations = {
  category: 'category',
  projectUser: 'projectUser',
};

@Entity('mantis_project_table')
export class MantisbtProjectEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 128, default: '' })
  name: string;

  // '10:development,30:release,50:stable,70:obsolete';
  // '10:開發中,30:已發佈,50:穩定,70:停止維護';
  @Type(() => ProjectStatus)
  @Transform(({ value }) => ProjectStatusEnum[value])
  @Column({
    type: 'smallint',
    width: 6,
    unsigned: true,
    default: 10,
    nullable: true,
  })
  status: number;

  @Type(() => Boolean)
  @Transform(({ value }) => !!value)
  @Column({ type: 'tinyint', width: 4, default: 1 })
  enabled: number;

  // '10:public,50:private';
  // '10:公開,50:非公開';
  @Type(() => ProjectViewStatue)
  @Transform(({ value }) => ProjectViewStatueEnum[value])
  @Column({ type: 'smallint', width: 6, default: 10 })
  viewState: number;

  //$s_access_levels_enum_string = '10:viewer,25:reporter,40:updater,55:developer,70:manager,90:administrator';
  //$s_access_levels_enum_string = '10:檢視者,25:回報人,40:更新者,55:開發者,70:專案管理者,90:系統管理者';
  @Exclude()
  @Type(() => AccessLevel)
  @Transform(({ value }) => AccessLevelTypeEnum[value])
  @Column({
    type: 'smallint',
    width: 6,
    default: 10,
  })
  accessMin: number;

  @Column({ type: 'varchar', length: 250, default: '' })
  filePath: string;

  @Column({ type: 'longtext', default: '' })
  description: string;

  @Column({ type: 'int', width: 10, unsigned: true, default: 1 })
  categoryId: number;

  @Type(() => MantisbtCategoryEntity)
  @ManyToOne(() => MantisbtCategoryEntity, {
    createForeignKeyConstraints: false,
  })
  category: MantisbtCategoryEntity;

  @Type(() => Boolean)
  @Transform(({ value }) => !!value)
  @Column({ type: 'tinyint', width: 4, default: 0 })
  inheritGlobal: number;

  @Type(() => MantisbtProjectUserListEntity)
  @ManyToOne(
    () => MantisbtProjectUserListEntity,
    (mantisbtProjectUserList) => mantisbtProjectUserList.projectId,
    {
      createForeignKeyConstraints: false,
    },
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'projectId' })
  projectUser: MantisbtProjectUserListEntity;
}
