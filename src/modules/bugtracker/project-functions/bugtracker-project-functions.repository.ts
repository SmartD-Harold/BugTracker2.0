import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BugtrackerProjectFunctionEntity } from './entity/bugtracker-project-function.entity';

@Injectable()
export class BugtrackerProjectFunctionsRepository extends Repository<BugtrackerProjectFunctionEntity> {
  constructor(protected dataSource: DataSource) {
    super(BugtrackerProjectFunctionEntity, dataSource.createEntityManager());
  }

  async findProjectFunctionsByProjectId(projectId: number) {
    return await this.find({
      select: ['id', 'name', 'code', 'projectId'],
      where: {
        projectId: projectId,
        enabled: true,
      },
      order: {
        order: 'ASC',
      },
    });
  }
}
