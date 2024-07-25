import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BugtrackerApartmentComplexEntity } from './entity/bugtracker-apartment-complex.entity';

@Injectable()
export class BugtrackerApartmentComplexRepository extends Repository<BugtrackerApartmentComplexEntity> {
  constructor(protected dataSource: DataSource) {
    super(BugtrackerApartmentComplexEntity, dataSource.createEntityManager());
  }
}
