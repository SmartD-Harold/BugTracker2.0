import { Injectable } from '@nestjs/common';
import {
  PriorityEnum,
  PriorityType,
  ReproducibilityEnum,
  ReproducibilityType,
  SeverityEnum,
  SeverityType,
  StatusMappingEnum,
  StatusType,
} from '../../mantisbt/bugs/interfaces';
import { MantisbtProjectsService } from '../../mantisbt/projects/mantisbt-projects.service';
import { instanceToPlain } from 'class-transformer';
import { MantisbtProjectEntity } from '../../mantisbt/projects/entity/mantisbt-project.entity';
import { MantisbtCategoryEntity } from '../../mantisbt/categories/entity/mantisbt-category.entity';
import { SettingsIssuesType } from './interfaces/commons.interface';
import { BugtrackerIssuesService } from '../../bugtracker/issues/bugtracker-issues.service';
@Injectable()
export class CommonsService {
  constructor(
    private readonly mantisbtProjectsService: MantisbtProjectsService,
    private readonly bugtrackerIssuesService: BugtrackerIssuesService,
  ) {}

  async getLastedAssignedTop10Users() {
    const users =
      await this.bugtrackerIssuesService.getLastedUpdatedAssignedToUser({
        limit: 10,
      });

    return users;
  }
  async getSettingsIssues(): Promise<SettingsIssuesType> {
    const projects =
      (await this.mantisbtProjectsService.findProjects({
        select: ['id', 'name', 'enabled', 'category'],
      })) || [];
    const categories = projects.reduce(
      (
        categoryMap: Map<number, MantisbtCategoryEntity>,
        project: MantisbtProjectEntity,
      ) => {
        if (project?.category) {
          categoryMap.set(
            project.category.id,
            instanceToPlain(project.category) as MantisbtCategoryEntity,
          );
        }
        return categoryMap;
      },
      new Map(),
    );

    return {
      projects: instanceToPlain(projects) as MantisbtProjectEntity[],
      categories: Array.from(
        categories,
        ([, value]) => value,
      ) as MantisbtCategoryEntity[],
      statuses: Object.values(StatusMappingEnum),
      priorities: Object.values(PriorityEnum),
      severities: Object.values(SeverityEnum),
      reproducibility: Object.values(ReproducibilityEnum),
    };
  }
}
