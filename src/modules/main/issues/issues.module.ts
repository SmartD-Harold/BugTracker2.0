import { Module } from '@nestjs/common';
import { BugtrackerIssuesModule } from '../../bugtracker/issues/bugtracker-issues.module';
import { IssuesStatusListService } from './lists/issues-status-list.service';
import { IssuesRoleListService } from './lists/issues-role-list.service';
import { IssuesUserListService } from './lists/issues-user-list.service';
import { IssuesUserListController } from './lists/issues-user-list.controller';
import { MantisbtBugsModule } from '../../mantisbt/bugs/mantisbt-bugs.module';
import { IssuesRoleListController } from './lists/issues-role-list.controller';
import { IssuesStatusListController } from './lists/issues-status-list.controller';
import { IssuesService } from './issues.service';
import { IssuesDataGridController } from './grids/issues-data-grid.controller';
import { IssuesDataGridService } from './grids/issues-data-grid.service';
import { IssuesStatusDataGridController } from './grids/issues-status-data-grid.controller';
import { IssuesStatusDataGridService } from './grids/issues-status-data-grid.service';
import { IssuesController } from './issues.controller';
import { BugtrackerTagsModule } from '../../bugtracker/tags/bugtracker-tags.module';
import { ProjectsModule } from '../projects/projects.module';
import { CategoriesModule } from '../categories/categories.module';
import { BugtrackerUserModule } from '../../bugtracker/users/bugtracker-user.module';
import { BugtrackerUrbanNexusModule } from '../../bugtracker/urban-nexus/bugtracker-urban-nexus.module';
import { BugtrackerProjectFunctionsModule } from '../../bugtracker/project-functions/bugtracker-project-functions.module';
import { MantisbtApiIssuesModule } from '../../mantisbt-api/issues/mantisbt-api-issues.module';
import { StorageModule } from '../storage/storage.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [
    BugtrackerUserModule,
    BugtrackerIssuesModule,
    BugtrackerTagsModule,
    BugtrackerUrbanNexusModule,
    BugtrackerProjectFunctionsModule,
    MantisbtBugsModule,
    ProjectsModule,
    CategoriesModule,
    MantisbtApiIssuesModule,
    StorageModule,
    TagsModule,
  ],
  controllers: [
    // Items
    IssuesController,
    // Lists
    IssuesUserListController,
    IssuesRoleListController,
    IssuesStatusListController,
    // Data Grid
    IssuesDataGridController,
    IssuesStatusDataGridController,
  ],
  providers: [
    IssuesService,
    // Lists
    IssuesStatusListService,
    IssuesRoleListService,
    IssuesUserListService,
    // Data Grid
    IssuesDataGridService,
    IssuesStatusDataGridService,
  ],
})
export class IssuesModule {}
