import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Type } from 'class-transformer';
import { BugtrackerUserEntity } from './bugtracker-user.entity';

export enum BugtrackerRoleRelationEnum {
  USERS = 'users',
}

@Entity('roles')
export class BugtrackerRoleEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  // USER | QA | RD | BD
  @Column({ type: 'varchar', length: 12 })
  code: string;

  @Column()
  name: string;

  @ManyToMany(() => BugtrackerUserEntity)
  @JoinTable({
    name: 'users_roles_roles',
    joinColumn: {
      name: 'roles_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'users_id',
      referencedColumnName: 'id',
    },
  })
  users: BugtrackerUserEntity[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
  })
  @Type(() => Date)
  deletedAt?: Date;
}
