import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import { DataSource, Repository } from 'typeorm';
import { MantisbtCategoryEntity } from './entity/mantisbt-category.entity';

@Injectable()
export class MantisbtCategoriesRepository extends Repository<MantisbtCategoryEntity> {
  constructor(
    @InjectDataSource(MantisbtDatabaseConnection)
    protected dataSource: DataSource,
  ) {
    super(MantisbtCategoryEntity, dataSource.createEntityManager());
  }
}
