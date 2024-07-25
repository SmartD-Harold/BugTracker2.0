import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { BugtrackerProjectsModule } from '../../bugtracker/projects/bugtracker-projects.module';
import { MantisbtProjectsModule } from '../../mantisbt/projects/mantisbt-projects.module';
import { BugtrackerUrbanNexusModule } from '../../bugtracker/urban-nexus/bugtracker-urban-nexus.module';
import { BugtrackerProjectFunctionsModule } from '../../bugtracker/project-functions/bugtracker-project-functions.module';

@Module({
  imports: [
    BugtrackerProjectsModule,
    MantisbtProjectsModule,
    BugtrackerUrbanNexusModule,
    BugtrackerProjectFunctionsModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
