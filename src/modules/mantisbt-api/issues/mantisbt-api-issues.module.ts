import { Module } from '@nestjs/common';
import { MantisbtApiIssuesService } from './mantisbt-api-issues.service';
import { MantisbtApiIssuesRepository } from './mantisbt-api-issues.repository';
import { MantisbtApiIssuesController } from './mantisbt-api-issues.controller';

@Module({
  controllers: [MantisbtApiIssuesController],
  providers: [MantisbtApiIssuesService, MantisbtApiIssuesRepository],
  exports: [MantisbtApiIssuesService, MantisbtApiIssuesRepository],
})
export class MantisbtApiIssuesModule {}
