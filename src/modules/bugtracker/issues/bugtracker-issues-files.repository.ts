import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BugtrackerIssueFilesEntity } from './entity/bugtracker-issue-files.entity';

@Injectable()
export class BugtrackerIssuesFilesRepository extends Repository<BugtrackerIssueFilesEntity> {
  constructor(protected dataSource: DataSource) {
    super(BugtrackerIssueFilesEntity, dataSource.createEntityManager());
  }
}
