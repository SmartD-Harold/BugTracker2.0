import { Module } from '@nestjs/common';
import { DataSyncController } from './data-sync.controller';
import { DataSyncService } from './data-sync.service';
import { BugtrackerUrbanNexusModule } from '../../bugtracker/urban-nexus/bugtracker-urban-nexus.module';
import { BugtrackerUserModule } from '../../bugtracker/users/bugtracker-user.module';
import { BugtrackerProjectFunctionsModule } from '../../bugtracker/project-functions/bugtracker-project-functions.module';
import { BugtrackerProjectsModule } from '../../bugtracker/projects/bugtracker-projects.module';
import { MantisbtProjectsModule } from '../../mantisbt/projects/mantisbt-projects.module';

@Module({
  imports: [
    BugtrackerUrbanNexusModule,
    BugtrackerUserModule,
    BugtrackerProjectFunctionsModule,
    BugtrackerProjectsModule,
    MantisbtProjectsModule,
  ],
  controllers: [DataSyncController],
  providers: [DataSyncService],
})
export class DataSyncModule {}
