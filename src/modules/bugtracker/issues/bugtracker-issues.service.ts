import { Injectable } from '@nestjs/common';
import { BugtrackerIssuesRepository } from './bugtracker-issues.repository';
import { BugtrackerRoleEntity } from '../users/entity/bugtracker-role.entity';
import { instanceToPlain } from 'class-transformer';
import { ResultToPlainWithoutMap } from '../../../decorators/result-to-plain.decorator';
import {
  BugtrackerIssueEntity,
  BugtrackerIssueHandlerTypeEnum,
} from './entity/bugtracker-issue.entity';
import { MantisbtBugEntity } from '../../mantisbt/bugs/entity/mantisbt-bug.entity';
import {
  BugTrackerFormDataZod,
  BugTrackerFormDataZodType,
} from './zod/bug-tracker-form-data.zod';
import { BugtrackerIssuesFilesRepository } from './bugtracker-issues-files.repository';
import { IssuesFromAPIType } from '../../mantisbt-api/issues/types/api-issues-response.interface';
import { BugtrackerAzureWorkItemRepository } from './bugtracker-azure-work-item.repository';

@Injectable()
export class BugtrackerIssuesService {
  constructor(
    private readonly issuesRepository: BugtrackerIssuesRepository,
    private readonly issuesFilesRepository: BugtrackerIssuesFilesRepository,
    private readonly bugtrackerAzureWorkItemRepository: BugtrackerAzureWorkItemRepository,
  ) {}

  async getIssues({ page = 1, size = 100, orderBy = {} } = {}) {
    return this.issuesRepository.findIssues({ page, size, orderBy });
  }

  async getLastedUpdatedAssignedToUser({ limit = 10 } = {}) {
    return await this.issuesRepository.findLastedAssignedUsers({ limit });
  }

  @ResultToPlainWithoutMap()
  async getIssuesByBugIds(issues: MantisbtBugEntity[]) {
    const ids = issues.map((item: MantisbtBugEntity) => item.id);

    return await this.issuesRepository.findIssuesWhereMantisBugId(ids);
  }

  async getIssuesMapDataByBugId(issues: MantisbtBugEntity[]) {
    const result: Map<number, BugtrackerIssueEntity> = new Map();
    if (issues.length > 0) {
      const _issuesData = await this.getIssuesByBugIds(issues);
      if (_issuesData.length > 0) {
        _issuesData.forEach((item) => {
          result.set(
            +item.mantisBugId,
            instanceToPlain(item) as BugtrackerIssueEntity,
          );
        });
      }
    }
    return result;
  }

  @ResultToPlainWithoutMap()
  async getIssuesByRoleId(roles: BugtrackerRoleEntity[]) {
    const bugTrackerIssues =
      await this.issuesRepository.findIssuesByRoleId(roles);
    return bugTrackerIssues;
  }

  async getIssuesMapDataByRoleId(roles: BugtrackerRoleEntity[]) {
    const result: Map<number, BugtrackerIssueEntity> = new Map();
    if (roles.length > 0) {
      const _issuesData = await this.getIssuesByRoleId(roles);
      if (_issuesData.length > 0) {
        _issuesData.forEach((item) => {
          result.set(
            +item.mantisBugId,
            instanceToPlain(item) as BugtrackerIssueEntity,
          );
        });
      }
    }
    return result;
  }

  async createIssue(issue: MantisbtBugEntity) {
    const handlerType = issue.handlerId
      ? BugtrackerIssueHandlerTypeEnum.USER
      : '';
    const hasOrNull = (value: any) => (value ? value : null);
    return await this.issuesRepository.insert({
      projectId: issue.projectId,
      categoryId: issue.categoryId,
      mantisBugId: issue.id,
      statueCode: issue.status,
      subStatueCode: issue.status,
      reporterUserId: issue.reporterId,
      handlerType,
      handlerUserId: hasOrNull(issue.handlerId),
    });
  }

  async updateIssue(id: number, issue: MantisbtBugEntity) {
    const handlerType = issue.handlerId
      ? BugtrackerIssueHandlerTypeEnum.USER
      : '';
    const existOrNull = (value: any) => (value ? value : null);
    return await this.issuesRepository.update(id, {
      projectId: issue.projectId,
      categoryId: issue.categoryId,
      statueCode: issue.status,
      reporterUserId: issue.reporterId,
      handlerType,
      handlerUserId: existOrNull(issue.handlerId),
    });
  }

  async newIssue(issue: any, mantisbtBug: IssuesFromAPIType) {
    const data: BugTrackerFormDataZodType = BugTrackerFormDataZod.parse(issue);

    const issueEntity: any = {
      uuid: data.uuid,
      mantisBugId: mantisbtBug.id,
      categoryId: data.category.id,
      projectId: data.project.id,
      statueCode: data.status.id,
      subStatueCode: data.subStatus.id,
      reporterUserId: data.reporter.id,
      handlerType: data.handlerType.id,
      deviceName: data.device,
      deviceNote: data.deviceVersion,
      projectFunctionId: data.projectFunction.id,
      expiresAt: data.deadline ? data.deadline : null,
      version: data.version,
      targetVersion: data.targetVersion,
    };

    // serviceTargetType
    if (data.serviceTargetType.name === 'apartmentComplex') {
      issueEntity.serviceTargetType = data.serviceTargetType.id;
      issueEntity.apartmentComplexId = data.serviceTarget.id;
    } else if (data.serviceTargetType.name === 'constructionCompany') {
      issueEntity.serviceTargetType = data.serviceTargetType.id;
      issueEntity.constructionCompanyId = data.serviceTarget.id;
    } else if (data.serviceTargetType.name === 'estateManagementCompany') {
      issueEntity.serviceTargetType = data.serviceTargetType.id;
      issueEntity.estateManagementCompanyId = data.serviceTarget.id;
    }

    // handlerType
    const hasHandlerType: boolean = !!data.handlerType?.id;
    if (hasHandlerType) {
      const _handlerTypeId = data.handlerType.id;
      const _handlerId = data.handler.id;
      issueEntity.handlerType = _handlerTypeId;
      if (_handlerTypeId === BugtrackerIssueHandlerTypeEnum.USER) {
        issueEntity.handlerUserId = _handlerId;
      } else if (_handlerTypeId === BugtrackerIssueHandlerTypeEnum.ROLE) {
        issueEntity.handlerRoleId = _handlerId;
      } else if (_handlerTypeId === BugtrackerIssueHandlerTypeEnum.DEPT) {
        issueEntity.handlerDeptId = _handlerId;
      }
    }

    // Azure Items
    const hasAzureItem: boolean = !!data.azure?.id;
    if (hasAzureItem) {
      const _azureWorkItem =
        await this.bugtrackerAzureWorkItemRepository.findOne({
          where: {
            azureId: data.azure.id,
          },
        });
      if (_azureWorkItem) issueEntity.azureWorkItems = [_azureWorkItem];
      await this.issuesRepository.save(issueEntity);
    } else {
      await this.issuesRepository.insert(issueEntity);
    }
  }

  async updateIssueFilesByUUID(uuid: string, bugId: number) {
    const result = await this.issuesFilesRepository.update(
      {
        uuid,
      },
      {
        bugId,
      },
    );
    return result;
  }

  async updateIssueFiles(nanoid: string, bugId: number, bugNoteId: number) {
    const result = await this.issuesFilesRepository.update(
      {
        nanoid,
      },
      {
        bugId,
        bugNoteId,
      },
    );
    return result;
  }

  async findIssueFilesByBugId(bugId: number, bugNoteId: number = null) {
    const _where = {
      bugId,
    };
    if (bugNoteId) _where['bugNoteId'] = bugNoteId;
    return this.issuesFilesRepository.find({
      where: _where,
      order: {
        createdAt: 'ASC',
      },
    });
  }
}
