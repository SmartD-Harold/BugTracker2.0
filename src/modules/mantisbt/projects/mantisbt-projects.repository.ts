import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MantisbtProjectEntity } from './entity/mantisbt-project.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import { ProjectViewStatueKeys } from './interfaces/project-view-statue.interface';

@Injectable()
export class MantisbtProjectsRepository extends Repository<MantisbtProjectEntity> {
  constructor(
    @InjectDataSource(MantisbtDatabaseConnection)
    protected dataSource: DataSource,
  ) {
    super(MantisbtProjectEntity, dataSource.createEntityManager());
  }

  async findProjectsByUserId(userId: number) {
    return await this.find({
      relations: {
        projectUser: true,
      },
      where: [
        {
          viewState: ProjectViewStatueKeys.public_10,
        },
        {
          viewState: ProjectViewStatueKeys.private_50,
          projectUser: {
            userId: userId,
          },
        },
      ],
      order: {
        id: 'ASC',
      },
    });
  }
}
