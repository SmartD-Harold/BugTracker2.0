import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BugtrackerEstateManagementCompanyEntity } from './entity/bugtracker-estate-management-company.entity';

@Injectable()
export class BugtrackerEstateManagementCompanyRepository extends Repository<BugtrackerEstateManagementCompanyEntity> {
  constructor(protected dataSource: DataSource) {
    super(
      BugtrackerEstateManagementCompanyEntity,
      dataSource.createEntityManager(),
    );
  }
}
