import { HttpException, Injectable } from '@nestjs/common';
import { ProjectType } from './types/project.interface';
import { ResponseType } from 'src/utils/axios/types/mantisbt.axios.interface';
import { AxiosRepository } from '../../../utils/axios/axios.repository';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class MantisbtApiProjectsRepository extends AxiosRepository {
  constructor(protected readonly cls: ClsService) {
    super('/projects', cls);
    console.log('🎯MantisbtApiProjectsRepository:constructor');
  }

  async getProjects(): Promise<ProjectType[]> {
    console.log('🎯MantisbtApiProjectsRepository:getProjects');
    const projects = await this.axiosInstance
      .get(`${this.apiTargetUrl}`, this.axiosConfig)
      .then(
        ({ data }: ResponseType<{ projects: ProjectType[] }>) => data.projects,
      )
      .catch(({ response }) => {
        const { status, statusText, data } = response;
        throw new HttpException(
          {
            status: status,
            error: statusText,
            data,
          },
          status,
        );
      });
    return projects;
  }

  async getProjectById(id: number): Promise<ProjectType> {
    const project = await this.axiosInstance
      .get(`${this.apiTargetUrl}/${id}`, this.axiosConfig)
      .then(
        ({ data }: ResponseType<{ projects: [ProjectType?] }>) =>
          data.projects[0],
      )
      .catch(({ response }) => {
        const { status, statusText, data } = response;
        throw new HttpException(
          {
            status: status,
            error: statusText,
            data,
          },
          status,
        );
      });
    return project;
  }
}
