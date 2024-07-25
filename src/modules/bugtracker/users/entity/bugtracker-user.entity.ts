import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsInt, IsUUID } from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { BugtrackerRoleEntity } from './bugtracker-role.entity';
import { BugtrackerDepartmentEntity } from './bugtracker-department.entity';
import { BugtrackerEmployeeEntity } from './bugtracker-employee.entity';

export enum BugtrackerUserRelationEnum {
  ROLES = 'roles',
  DEPARTMENTS = 'departments',
  EMPLPOYEE = 'employee',
}

@Entity('users')
export class BugtrackerUserEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  id: number;

  @Column()
  @IsEmail()
  account: string;

  @Column()
  userName: string;

  @Column()
  supertokensThirdPartyId: string;

  @Column({ unique: true })
  @IsUUID('4')
  supertokensThirdPartyUserId: string;

  @Column({ type: 'int' })
  @IsInt()
  mantisbtUserId: number;

  @Column()
  @Exclude()
  mantisbtUserPassword: string;

  @Column({ type: 'int' })
  mantisbtApiTokenId: number;

  @Column({ unique: true })
  mantisbtApiTokenCode: string;

  @Column({ nullable: true })
  employeeCode: string;

  @Column({ nullable: true })
  employeePosition: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  departmentCode: string;

  @Column({ nullable: true })
  departmentSection: string;

  @Column({ nullable: true })
  departmentSectionCode: string;

  @Column({ default: true })
  enabled: boolean;

  @ManyToMany(() => BugtrackerRoleEntity)
  @JoinTable({
    name: 'users_roles_roles',
    joinColumn: {
      name: 'users_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'roles_id',
      referencedColumnName: 'id',
    },
  })
  roles: BugtrackerRoleEntity[];

  @ManyToMany(() => BugtrackerDepartmentEntity)
  @JoinTable()
  departments: BugtrackerDepartmentEntity[];

  @OneToOne(() => BugtrackerEmployeeEntity, (employee) => employee.email, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'account',
    referencedColumnName: 'email',
  })
  employee: BugtrackerEmployeeEntity;

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
