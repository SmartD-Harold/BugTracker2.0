import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Transform, Type } from 'class-transformer';
import {
  ServiceTargetType,
  serviceTargetTypeEnum,
} from '../../issues/interfaces';

export const ProjectRelationEnum = {
  SERVICE_TARGET_TYPE: 'serviceTargetType',
};

@Entity('projects')
export class BugtrackerProjectEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  // P01
  @Column({ type: 'char', length: 3, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 128, default: '' })
  name: string;

  @Column({ type: 'int', width: 10, unsigned: true })
  mantisbtProjectId: number;

  @Column({ type: 'int', width: 11, nullable: true, unsigned: true })
  handlerRoleId: number;

  @Column({ type: 'varchar', length: 128, default: '' })
  platform: string;

  @Column({ type: 'varchar', length: 128, default: '' })
  product: string;

  @Column({ type: 'varchar', length: 128, default: '' })
  service: string;

  @Column({ type: 'int', width: 10, unsigned: true, default: 0 })
  order: number;

  @Type(() => ServiceTargetType)
  @Column({ type: 'smallint', width: 6, nullable: true })
  @Transform(({ value }) => serviceTargetTypeEnum[value])
  serviceTargetType: ServiceTargetType;

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
