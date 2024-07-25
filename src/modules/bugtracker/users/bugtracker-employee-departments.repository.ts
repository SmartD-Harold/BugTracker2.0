import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BugtrackerEmployeeDepartmentsEntity } from './entity/bugtracker-employee_departments.entity';

@Injectable()
export class BugtrackerEmployeeDepartmentsRepository extends Repository<BugtrackerEmployeeDepartmentsEntity> {
  constructor(protected dataSource: DataSource) {
    super(
      BugtrackerEmployeeDepartmentsEntity,
      dataSource.createEntityManager(),
    );
  }
}
