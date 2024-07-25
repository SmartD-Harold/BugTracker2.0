import { Injectable } from '@nestjs/common';
import { MantisbtApiProjectsRepository } from './mantisbt-api-projects.repository';

@Injectable()
export class MantisbtApiProjectsService {
  constructor(
    protected readonly mantisbtApiProjectsRepository: MantisbtApiProjectsRepository,
  ) {}

  async getMiniProjects() {
    console.log('🎯MantisbtApiProjectsService:getMiniProjects');
    const projects = await this.mantisbtApiProjectsRepository
      .settingCurrentUser()
      .getProjects();
    console.log(projects);
    return projects?.map((project) => ({
      id: project.id,
      name: project.name,
    }));
  }

  async getProject(id: number) {
    return await this.mantisbtApiProjectsRepository
      .settingCurrentUser()
      .getProjectById(id);
  }
}
