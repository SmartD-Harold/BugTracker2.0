import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import { DataSource, Repository } from 'typeorm';
import { MantisbtBugRelationshipEntity } from './entity/mantisbt-bug-relationship.entity';

@Injectable()
export class MantisbtBugRelationshipRepository extends Repository<MantisbtBugRelationshipEntity> {
  constructor(
    @InjectDataSource(MantisbtDatabaseConnection)
    protected dataSource: DataSource,
  ) {
    super(MantisbtBugRelationshipEntity, dataSource.createEntityManager());
  }
}
