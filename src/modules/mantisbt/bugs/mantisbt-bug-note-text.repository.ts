import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import { DataSource, Repository } from 'typeorm';
import { MantisbtBugNoteTextEntity } from './entity/mantisbt-bug-note-text.entity';

@Injectable()
export class MantisbtBugNoteTextRepository extends Repository<MantisbtBugNoteTextEntity> {
  constructor(
    @InjectDataSource(MantisbtDatabaseConnection)
    protected dataSource: DataSource,
  ) {
    super(MantisbtBugNoteTextEntity, dataSource.createEntityManager());
  }
}
