import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BugtrackerUrbanNexusEntity } from './entity/bugtracker-urban-nexus.entity';

@Injectable()
export class BugtrackerUrbanNexusRepository extends Repository<BugtrackerUrbanNexusEntity> {
  constructor(protected dataSource: DataSource) {
    super(BugtrackerUrbanNexusEntity, dataSource.createEntityManager());
  }
}
