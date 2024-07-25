import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { BugtrackerProjectEntity } from './entity/bugtracker-project.entity';

@Injectable()
export class BugtrackerProjectsRepository extends Repository<BugtrackerProjectEntity> {
  constructor(protected dataSource: DataSource) {
    super(BugtrackerProjectEntity, dataSource.createEntityManager());
  }

  async findIssuesWhereMantisProjectId(ids: number[]) {
    return this.find({
      where: {
        mantisbtProjectId: In(ids),
      },
      take: 200,
    });
  }
}
