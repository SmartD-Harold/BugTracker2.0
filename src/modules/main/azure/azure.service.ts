import { Injectable } from '@nestjs/common';
import { AzureRepository } from './azure.repository';
import { ApiAzureWorkItemZod } from './zod/api-azure-work-item.zod';
import { BugtrackerAzureWorkItemRepository } from '../../bugtracker/issues/bugtracker-azure-work-item.repository';
import { twDayjs } from '../../../utils/dayjs/dayjs';
import { DbAzureWorkItemZod } from './zod/db-azure-work-item.zod';

@Injectable()
export class AzureService {
  constructor(
    private readonly azureRepository: AzureRepository,
    private readonly bugtrackerAzureWorkItemRepository: BugtrackerAzureWorkItemRepository,
  ) {}

  async getWorkItem({
    id,
    org = null,
    project = null,
  }: {
    id: number;
    org?: string | null;
    project?: string | null;
  }) {
    const findOptions: {
      where: {
        azureId: number;
        azureOrg?: string | null;
        azureProject?: string | null;
      };
    } = {
      where: {
        azureId: id,
      },
    };
    if (org) findOptions.where.azureOrg = org;
    if (project) findOptions.where.azureProject = project;

    const _findWorkItem = await this.bugtrackerAzureWorkItemRepository.findOne({
      where: {
        azureId: id,
      },
    });

    if (
      _findWorkItem &&
      _findWorkItem.expiredAt &&
      twDayjs().isBefore(_findWorkItem.expiredAt)
    ) {
      return DbAzureWorkItemZod.parse(_findWorkItem);
    }

    const _workItemResult = await this.azureRepository.fetchWorkItemById({
      id,
      org,
      project,
    });

    const workItem = ApiAzureWorkItemZod.parse(_workItemResult.data);

    await this.bugtrackerAzureWorkItemRepository.updateOrCreate(
      _workItemResult.req,
      workItem,
    );

    return workItem;
  }
}
