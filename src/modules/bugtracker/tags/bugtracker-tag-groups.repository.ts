import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BugtrackerTagGroupEntity } from './entity/bugtracker-tag-group.entity';

@Injectable()
export class BugtrackerTagGroupsRepository extends Repository<BugtrackerTagGroupEntity> {
  constructor(protected dataSource: DataSource) {
    super(BugtrackerTagGroupEntity, dataSource.createEntityManager());
  }
}
