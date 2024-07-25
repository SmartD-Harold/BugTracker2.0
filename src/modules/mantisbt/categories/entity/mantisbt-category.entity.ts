import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Type } from 'class-transformer';
import { MantisbtProjectEntity } from '../../projects/entity/mantisbt-project.entity';
import { MantisbtUserMiniDto } from '../../bugs/dto/mantisbt-user-mini.dto';
import { MantisbtUserEntity } from '../../users/entity/mantisbt-user.entity';

export const mantisbtCategoryRelations = {
  project: 'project',
  user: 'user',
};

@Entity('mantis_category_table')
export class MantisbtCategoryEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  // 0:[所有專案]
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
  userId: number;

  @Type(() => MantisbtUserMiniDto)
  @ManyToOne(() => MantisbtUserEntity, {
    createForeignKeyConstraints: false,
  })
  user: MantisbtUserMiniDto;

  @Column({ type: 'varchar', length: 128, default: '' })
  name: string;

  @Column({
    type: 'int',
    width: 10,
    unsigned: true,
    default: 0,
  })
  status: number;
}
