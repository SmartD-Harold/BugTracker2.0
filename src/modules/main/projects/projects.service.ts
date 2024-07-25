import { Injectable } from '@nestjs/common';
import { BugtrackerProjectsService } from '../../bugtracker/projects/bugtracker-projects.service';
import { MantisbtProjectsService } from '../../mantisbt/projects/mantisbt-projects.service';
import { CLS_Keys } from '../../../utils/cls/cls.enum';
import { ClsService } from 'nestjs-cls';
import { ResultToPlainWithoutMap } from '../../../decorators/result-to-plain.decorator';
import { instanceToPlain } from 'class-transformer';
import { ViewStatueKeyEnum } from '../../mantisbt/bugs/interfaces';
import { BugtrackerUrbanNexusService } from '../../bugtracker/urban-nexus/bugtracker-urban-nexus.service';
import { BugtrackerProjectFunctionsRepository } from '../../bugtracker/project-functions/bugtracker-project-functions.repository';
import { MantisbtProjectEntity } from '../../mantisbt/projects/entity/mantisbt-project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly cls: ClsService,
    private readonly bugtrackerProjectsService: BugtrackerProjectsService,
    private readonly mantisbtProjectsService: MantisbtProjectsService,
    private readonly bugtrackerUrbanNexusService: BugtrackerUrbanNexusService,
    private readonly bugtrackerProjectFunctionsRepository: BugtrackerProjectFunctionsRepository,
  ) {}

  private getMantisbtUserId() {
    return this.cls.get(CLS_Keys.user)?.mantisbtUserId || '';
  }

  @ResultToPlainWithoutMap()
  async getProject(projectId: number) {
    const mantisbtProject =
      await this.mantisbtProjectsService.findProject(projectId);

    const bugtrackerProject =
      await this.bugtrackerProjectsService.getProjectMapDataByBugId([
        mantisbtProject,
      ]);

    return {
      mantisbt: mantisbtProject,
      bugtracker: bugtrackerProject,
    };
  }

  @ResultToPlainWithoutMap()
  async getProjects() {
    const mantisbtProjects = await this.mantisbtProjectsService.findProjects();

    const bugtrackerProjects =
      await this.bugtrackerProjectsService.getProjectMapDataByBugId(
        mantisbtProjects,
      );

    return {
      mantisbt: mantisbtProjects,
      bugtracker: bugtrackerProjects,
    };
  }

  @ResultToPlainWithoutMap()
  async getMyProjects() {
    const userId = this.getMantisbtUserId();
    const mantisbtProjects =
      await this.mantisbtProjectsService.findMyProjects(userId);

    const bugtrackerProjects =
      await this.bugtrackerProjectsService.findProjects();

    return {
      mantisbt: mantisbtProjects,
      bugtracker: bugtrackerProjects,
    };
  }

  async syncProjects({ page, size }) {
    let updated = 0;
    let created = 0;
    const mantisbtProjects = await this.mantisbtProjectsService.findProjects({
      page,
      size,
    });
    const bugtrackerProjects =
      await this.bugtrackerProjectsService.findProjects({
        page,
        size,
        orderBy: {
          id: 'ASC',
        },
      });

    const bugtrackerProjectsIds =
      bugtrackerProjects.map((project) => project.mantisbtProjectId) || [];
    for (const mantisbtProject of mantisbtProjects) {
      const hasProject = bugtrackerProjectsIds.includes(mantisbtProject.id);
      if (!hasProject) {
        await this.bugtrackerProjectsService.createProject(mantisbtProject);
        created++;
      } else {
        const bugtrackerProject = bugtrackerProjects.find(
          (project) => project.mantisbtProjectId === mantisbtProject.id,
        );
        await this.bugtrackerProjectsService.updateProject(
          bugtrackerProject.id,
          mantisbtProject,
        );
        updated++;
      }
    }

    return {
      updated,
      created,
    };
  }

  async getFormDisplayProjects() {
    const { mantisbt = [], bugtracker = new Map() } = await this.getProjects();

    const _mantisbtProjects =
      mantisbt.length > 0 ? instanceToPlain(mantisbt) : [];

    const _projects = _mantisbtProjects.map((project: any) =>
      this.buildProject(project, bugtracker),
    );

    return _projects;
  }

  private buildProject(project, bugtracker) {
    if (project instanceof MantisbtProjectEntity) {
      project = instanceToPlain(project);
    }

    const bugtrackerProject = bugtracker.get(project.id);
    return {
      id: project.id,
      code: bugtrackerProject.code,
      name: project.name,
      enabled: bugtracker.has(project.id),
      isPublic: project.viewState?.id === ViewStatueKeyEnum.public_10,
      handlerRoleId: bugtrackerProject.handlerRoleId,
      platform: bugtrackerProject.platform,
      product: bugtrackerProject.product,
      service: bugtrackerProject.service,
      order: bugtrackerProject.order,
      serviceTargetType: bugtrackerProject?.serviceTargetType || null,
    };
  }

  async getServiceTargetsAndProjectFunctions(projectId: number) {
    let serviceTargets: null | {
      type: string;
      data: any;
    } = null;
    let projectFunctions = [];

    const { mantisbt, bugtracker } = await this.getProject(projectId);

    if (Object.keys(mantisbt).length === 0) {
      return {
        project: {},
        serviceTargets,
        projectFunctions,
      };
    }

    const bugtrackerProject = bugtracker.get(projectId);
    const project = this.buildProject(mantisbt, bugtracker);

    const _serviceTargetType = bugtrackerProject?.serviceTargetType || {};

    if (Object.keys(_serviceTargetType).length > 0) {
      serviceTargets = await this.bugtrackerUrbanNexusService.findServiceTarget(
        bugtrackerProject.serviceTargetType.name,
        {
          limit: 100,
        },
      );
    }

    projectFunctions =
      await this.bugtrackerProjectFunctionsRepository.findProjectFunctionsByProjectId(
        projectId,
      );

    return {
      project,
      serviceTarget: serviceTargets,
      projectFunctions,
    };
  }
}
