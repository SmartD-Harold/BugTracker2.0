import { Injectable } from '@nestjs/common';
import { BugtrackerProjectsRepository } from './bugtracker-projects.repository';
import { instanceToPlain } from 'class-transformer';
import { BugtrackerProjectEntity } from './entity/bugtracker-project.entity';
import { MantisbtProjectEntity } from '../../mantisbt/projects/entity/mantisbt-project.entity';

@Injectable()
export class BugtrackerProjectsService {
  constructor(
    private readonly bugtrackerProjectsRepository: BugtrackerProjectsRepository,
  ) {}

  async findProjects({ page = 1, size = 10, orderBy = {} } = {}) {
    orderBy = Object.keys(orderBy).length > 0 ? orderBy : { id: 'DESC' };
    return await this.bugtrackerProjectsRepository.find({
      take: size,
      skip: size * (page - 1),
      order: orderBy,
    });
  }

  async findProjectById(projects: MantisbtProjectEntity[]) {
    const ids = projects.map((item: MantisbtProjectEntity) => item.id);
    return await this.bugtrackerProjectsRepository.findIssuesWhereMantisProjectId(
      ids,
    );
  }

  async getProjectMapDataByBugId(projects: MantisbtProjectEntity[]) {
    const result: Map<number, BugtrackerProjectEntity> = new Map();
    if (projects.length > 0) {
      const _issuesData = await this.findProjectById(projects);
      if (_issuesData.length > 0) {
        _issuesData.forEach((item) => {
          result.set(
            +item.mantisbtProjectId,
            instanceToPlain(item) as BugtrackerProjectEntity,
          );
        });
      }
    }
    return result;
  }

  async createProject(project: MantisbtProjectEntity) {
    const { name, id: mantisbtProjectId } = project;
    return await this.bugtrackerProjectsRepository.insert({
      name,
      mantisbtProjectId,
    });
  }

  async updateProject(id: number, project: MantisbtProjectEntity) {
    const { name, id: mantisbtProjectId } = project;
    return await this.bugtrackerProjectsRepository.update(id, {
      name,
      mantisbtProjectId,
    });
  }
}
