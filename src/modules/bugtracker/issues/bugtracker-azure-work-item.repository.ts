import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BugtrackerAzureWorkItemEntity } from './entity/bugtracker-azure-work-item.entity';
import { twDayjs } from '../../../utils/dayjs/dayjs';

@Injectable()
export class BugtrackerAzureWorkItemRepository extends Repository<BugtrackerAzureWorkItemEntity> {
  constructor(protected dataSource: DataSource) {
    super(BugtrackerAzureWorkItemEntity, dataSource.createEntityManager());
  }

  async updateOrCreate(playload: any, workItem: any) {
    return await this.upsert(
      {
        azureId: workItem.id,
        rev: workItem.rev,
        areaPath: workItem.path,
        teamProject: workItem.project,
        iterationPath: workItem.iterationPath,
        workItemType: workItem.workItemType,
        state: workItem.state,
        reason: workItem.reason,
        title: workItem.title,
        description: workItem.description ?? '',
        commentCount: workItem.commentCount || 0,
        assignedToName: workItem.assignedTo?.name ?? null,
        assignedToEmail: workItem.assignedTo?.email ?? null,
        createdDate: workItem.createdDate,
        createdByName: workItem.createdBy?.name ?? null,
        createdByEmail: workItem.createdBy?.email ?? null,
        changedDate: workItem.changedDate,
        changedByName: workItem.changedBy?.name ?? null,
        changedByEmail: workItem.changedBy?.email ?? null,
        stateChangeDate: workItem.stateChangeDate ?? null,
        targetDate: workItem.targetDate ?? null,
        priority: workItem.priority,
        boardColumn: workItem.boardColumn,
        boardColumnDone: !!workItem.boardColumnDone,
        link: workItem.link,
        url: workItem.url,
        activatedDate: workItem.activatedDate ?? null,
        activatedByName: workItem.activatedBy?.name ?? null,
        activatedByEmail: workItem.activatedBy?.email ?? null,
        closedDate: workItem.closedDate ?? null,
        closedByName: workItem.closedBy?.name ?? null,
        closedByEmail: workItem.closedBy?.email ?? null,
        azureOrg: playload.org,
        azureProject: playload.project,
        sendApiUrl: playload.url,
        sendApiMethod: playload.method,
        expiredAt: twDayjs().add(30, 'minutes').toDate(),
      },
      ['azureId'],
    );
  }
}
