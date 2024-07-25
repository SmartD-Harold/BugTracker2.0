import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Type, Transform } from 'class-transformer';
import { AccessLevel, AccessLevelTypeEnum } from '../interfaces';
import { MantisbtUserMiniDto } from '../../bugs/dto/mantisbt-user-mini.dto';
import { MantisbtUserEntity } from '../../users/entity/mantisbt-user.entity';
import { MantisbtProjectEntity } from './mantisbt-project.entity';

export const mantisbtProjectUserListRelations = {
  project: 'project',
  user: 'user',
};

@Entity('mantis_project_user_list_table')
export class MantisbtProjectUserListEntity {
  @PrimaryColumn({
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

  @PrimaryColumn({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
  })
  userId: number;

  @Type(() => MantisbtUserMiniDto)
  @ManyToOne(() => MantisbtUserEntity, {
    createForeignKeyConstraints: false,
  })
  user: MantisbtUserMiniDto;

  //$s_access_levels_enum_string = '10:viewer,25:reporter,40:updater,55:developer,70:manager,90:administrator';
  //$s_access_levels_enum_string = '10:檢視者,25:回報人,40:更新者,55:開發者,70:專案管理者,90:系統管理者';
  @Type(() => AccessLevel)
  @Transform(({ value }) => AccessLevelTypeEnum[value])
  @Column({ type: 'smallint', width: 6, default: 10 })
  accessLevel: number;
}
