import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BugtrackerRoleEntity } from './entity/bugtracker-role.entity';

@Injectable()
export class BugtrackerRolesRepository extends Repository<BugtrackerRoleEntity> {
  constructor(protected dataSource: DataSource) {
    super(BugtrackerRoleEntity, dataSource.createEntityManager());
  }
}
