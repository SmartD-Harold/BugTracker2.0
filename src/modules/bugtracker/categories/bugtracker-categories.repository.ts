import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { BugtrackerCategoriesEntity } from './entity/bugtracker-categories.entity';

@Injectable()
export class BugtrackerCategoriesRepository extends Repository<BugtrackerCategoriesEntity> {
  constructor(protected dataSource: DataSource) {
    super(BugtrackerCategoriesEntity, dataSource.createEntityManager());
  }

  async findIssuesWhereMantisCategoryId(ids: number[]) {
    return this.find({
      where: {
        mantisbtCategoryId: In(ids),
      },
      take: 200,
    });
  }
}
