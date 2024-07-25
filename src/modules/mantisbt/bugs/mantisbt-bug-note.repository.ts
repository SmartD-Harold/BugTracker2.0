import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import { DataSource, Repository } from 'typeorm';
import { MantisbtBugNoteEntity } from './entity/mantisbt-bug-note.entity';

@Injectable()
export class MantisbtBugNoteRepository extends Repository<MantisbtBugNoteEntity> {
  constructor(
    @InjectDataSource(MantisbtDatabaseConnection)
    protected dataSource: DataSource,
  ) {
    super(MantisbtBugNoteEntity, dataSource.createEntityManager());
  }
}
