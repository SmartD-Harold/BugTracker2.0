import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BugtrackerConstructionCompanyEntity } from './entity/bugtracker-construction-company.entity';

@Injectable()
export class BugtrackerConstructionCompanyRepository extends Repository<BugtrackerConstructionCompanyEntity> {
  constructor(protected dataSource: DataSource) {
    super(
      BugtrackerConstructionCompanyEntity,
      dataSource.createEntityManager(),
    );
  }
}
