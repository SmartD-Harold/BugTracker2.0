import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BugtrackerEmployeeEntity } from './entity/bugtracker-employee.entity';

@Injectable()
export class BugtrackerEmployeeRepository extends Repository<BugtrackerEmployeeEntity> {
  constructor(protected dataSource: DataSource) {
    super(BugtrackerEmployeeEntity, dataSource.createEntityManager());
  }
}
