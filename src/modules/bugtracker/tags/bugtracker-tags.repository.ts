import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BugtrackerTagEntity } from './entity/bugtracker-tag.entity';

@Injectable()
export class BugtrackerTagsRepository extends Repository<BugtrackerTagEntity> {
  constructor(protected dataSource: DataSource) {
    super(BugtrackerTagEntity, dataSource.createEntityManager());
  }
}
