import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Type } from 'class-transformer';
import { MantisbtBugEntity } from './mantisbt-bug.entity';
import { MantisbtUserMiniDto } from '../dto/mantisbt-user-mini.dto';
import { MantisbtUserEntity } from '../../users/entity/mantisbt-user.entity';

export const mantisbtBugMonitorRelations = {
  user: 'user',
  bug: 'bug',
};

@Entity('mantis_bug_monitor_table')
export class MantisbtBugMonitorEntity {
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

  @PrimaryColumn({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
  })
  bugId: number;

  @Type(() => MantisbtBugEntity)
  @ManyToOne(() => MantisbtBugEntity, {
    createForeignKeyConstraints: false,
  })
  bug: MantisbtBugEntity;
}
