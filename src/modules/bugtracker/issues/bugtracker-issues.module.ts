import { Module } from '@nestjs/common';
import { BugtrackerIssuesService } from './bugtracker-issues.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BugtrackerIssueEntity } from './entity/bugtracker-issue.entity';
import { BugtrackerIssuesRepository } from './bugtracker-issues.repository';
import { MantisbtApiIssuesModule } from '../../mantisbt-api/issues/mantisbt-api-issues.module';
import { MantisbtBugsModule } from '../../mantisbt/bugs/mantisbt-bugs.module';
import { BugtrackerIssuesFilesRepository } from './bugtracker-issues-files.repository';
import { BugtrackerAzureWorkItemRepository } from './bugtracker-azure-work-item.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BugtrackerIssueEntity]),
    MantisbtApiIssuesModule,
    MantisbtBugsModule,
  ],
  providers: [
    BugtrackerIssuesService,
    BugtrackerIssuesRepository,
    BugtrackerIssuesFilesRepository,
    BugtrackerAzureWorkItemRepository,
  ],
  exports: [
    BugtrackerIssuesService,
    BugtrackerIssuesRepository,
    BugtrackerIssuesFilesRepository,
    BugtrackerAzureWorkItemRepository,
  ],
})
export class BugtrackerIssuesModule {}
