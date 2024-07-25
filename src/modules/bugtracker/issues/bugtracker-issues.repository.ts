import { DataSource, Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  BugtrackerIssueEntity,
  IssueRelationEnum,
} from './entity/bugtracker-issue.entity';
import { BugtrackerRoleEntity } from '../users/entity/bugtracker-role.entity';
import { ProjectRelationEnum } from '../projects/entity/bugtracker-project.entity';

@Injectable()
export class BugtrackerIssuesRepository extends Repository<BugtrackerIssueEntity> {
  constructor(protected dataSource: DataSource) {
    super(BugtrackerIssueEntity, dataSource.createEntityManager());
  }

  async findIssues({ page = 1, size = 100, orderBy = {} } = {}) {
    orderBy = Object.keys(orderBy).length > 0 ? orderBy : { updatedAt: 'DESC' };
    return this.find({
      take: size,
      skip: size * (page - 1),
      order: orderBy,
    });
  }

  private getIssuesRelations() {
    return [
      IssueRelationEnum.APARTMENT_COMPLEX,
      IssueRelationEnum.CONSTRUCTION_COMPANY,
      IssueRelationEnum.ESTATE_MANAGEMENT,
      IssueRelationEnum.PROJECT_FUNCTION,
      IssueRelationEnum.AZURE_TASKS,
      IssueRelationEnum.HANDLER_ROLE,
      IssueRelationEnum.HANDLER_ROLE_USERS,
      IssueRelationEnum.HANDLER_USER,
      IssueRelationEnum.HANDLER_USER_EMPLPOYEE, // sub relation
      IssueRelationEnum.REPORTER_USER,
      IssueRelationEnum.REPORTER_USER_EMPLPOYEE, // sub relation
      IssueRelationEnum.PROJECT,
      IssueRelationEnum.CATEGORY,
      IssueRelationEnum.ATTACH_FILES,
      IssueRelationEnum.AZURE_WORK_ITEMS,
    ];
  }

  async findIssuesWhereMantisBugId(ids: number[]) {
    return this.find({
      where: {
        mantisBugId: In(ids),
      },
      relations: this.getIssuesRelations(),
      take: 50,
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async findIssuesByRoleId(roles: BugtrackerRoleEntity[]) {
    const _roles = roles.map((role) => role.id);
    return this.find({
      where: {
        // handlerType: BugtrackerIssueHandlerTypeEnum.ROLE,
        handlerRoleId: In(_roles),
      },
      relations: [...this.getIssuesRelations(), IssueRelationEnum.HANDLER_ROLE],
      take: 50,
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async findLastedAssignedUsers({ limit = 10 } = {}) {
    return this.createQueryBuilder('bugs')
      .leftJoinAndSelect('bugs.handlerUser', 'handlerUser')
      .select([
        'bugs.handler_user_id as userId',
        'handlerUser.mantisbt_user_id AS mantisbtUserId',
        'handlerUser.account AS email',
        'handlerUser.user_name AS name',
        'MAX(bugs.updated_at) AS updatedAt',
      ])
      .where('bugs.handler_user_id IS NOT NULL')
      .groupBy('bugs.handler_user_id')
      .orderBy({ updatedAt: 'DESC' })
      .limit(limit)
      .getRawMany();
  }
}
