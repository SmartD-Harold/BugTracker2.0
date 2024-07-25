import { Module } from '@nestjs/common';
import { CommonsController } from './commons.controller';
import { CommonsService } from './commons.service';
import { MantisbtProjectsModule } from '../../mantisbt/projects/mantisbt-projects.module';
import { BugtrackerIssuesModule } from '../../bugtracker/issues/bugtracker-issues.module';

@Module({
  imports: [MantisbtProjectsModule, BugtrackerIssuesModule],
  controllers: [CommonsController],
  providers: [CommonsService],
})
export class CommonsModule {}
