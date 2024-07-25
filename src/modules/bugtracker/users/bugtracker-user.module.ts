import { Module } from '@nestjs/common';
import { BugtrackerUserController } from './bugtracker-user.controller';
import { BugtrackerUserService } from './bugtracker-user.service';
import { BugtrackerUserRepository } from './bugtracker-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BugtrackerUserEntity } from './entity/bugtracker-user.entity';
import { MantisbtApiUsersModule } from '../../mantisbt-api/users/mantisbt-api-users.module';
import { MantisbtRestApiTokensModule } from '../../mantisbt/tokens/mantisbt-rest-api-tokens.module';
import { MantisbtUsersModule } from '../../mantisbt/users/mantisbt-users.module';
import { BugtrackerEmployeeRepository } from './bugtracker-employee.repository';
import { BugtrackerEmployeeDepartmentsRepository } from './bugtracker-employee-departments.repository';
import { BugtrackerRolesRepository } from './bugtracker-roles.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BugtrackerUserEntity]),
    MantisbtUsersModule,
    MantisbtApiUsersModule,
    MantisbtRestApiTokensModule,
  ],
  controllers: [BugtrackerUserController],
  providers: [
    BugtrackerUserService,
    BugtrackerUserRepository,
    BugtrackerEmployeeRepository,
    BugtrackerEmployeeDepartmentsRepository,
    BugtrackerRolesRepository,
  ],
  exports: [
    BugtrackerUserService,
    BugtrackerUserRepository,
    BugtrackerEmployeeRepository,
    BugtrackerRolesRepository,
    BugtrackerEmployeeDepartmentsRepository,
  ],
})
export class BugtrackerUserModule {}
