import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import { DataSource, Repository } from 'typeorm';
import { MantisbtTagEntity } from './entity/mantisbt-tag.entity';

@Injectable()
export class MantisbtTagsRepository extends Repository<MantisbtTagEntity> {
  constructor(
    @InjectDataSource(MantisbtDatabaseConnection)
    protected dataSource: DataSource,
  ) {
    super(MantisbtTagEntity, dataSource.createEntityManager());
  }

  async findTagsWithBugCount(): Promise<MantisbtTagEntity[]> {
    return this.dataSource
      .createQueryBuilder(MantisbtTagEntity, 'tag')
      .loadRelationCountAndMap('tag.bugCount', 'tag.bugs')
      .getMany();
  }
  async findTagsWithBugCountByIds(ids: number[]): Promise<MantisbtTagEntity[]> {
    return this.dataSource
      .createQueryBuilder(MantisbtTagEntity, 'tag')
      .where('tag.id IN (:...ids)', { ids })
      .loadRelationCountAndMap('tag.bugCount', 'tag.bugs')
      .getMany();
  }
}
