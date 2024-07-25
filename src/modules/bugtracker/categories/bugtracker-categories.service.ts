import { Injectable } from '@nestjs/common';
import { BugtrackerCategoriesRepository } from './bugtracker-categories.repository';
import { MantisbtCategoryEntity } from '../../mantisbt/categories/entity/mantisbt-category.entity';
import { BugtrackerCategoriesEntity } from './entity/bugtracker-categories.entity';

@Injectable()
export class BugtrackerCategoriesService {
  constructor(
    private readonly bugtrackerCategoriesRepository: BugtrackerCategoriesRepository,
  ) {}

  async findCategories({ page = 1, size = 10, orderBy = {} } = {}) {
    orderBy = Object.keys(orderBy).length > 0 ? orderBy : { id: 'DESC' };
    return await this.bugtrackerCategoriesRepository.find({
      take: size,
      skip: size * (page - 1),
      order: orderBy,
    });
  }

  // async findCategoryById(categories: MantisbtCategoryEntity[]) {
  //   const ids = categories.map((item: MantisbtCategoryEntity) => item.id);
  //   return await this.bugtrackerCategoriesRepository.findIssuesWhereMantisCategoryId(
  //     ids,
  //   );
  // }

  // async getCategoryMapDataByBugId(categories: MantisbtCategoryEntity[]) {
  //   const result: Map<number, BugtrackerCategoriesEntity> = new Map();
  //   if (categories.length > 0) {
  //     const _issuesData = await this.findCategoryById(categories);
  //     if (_issuesData.length > 0) {
  //       _issuesData.forEach((item) => {
  //         result.set(+item.mantisbtCategoryId, item);
  //       });
  //     }
  //   }
  //   return result;
  // }

  async createCategory(category: MantisbtCategoryEntity) {
    const { name, id: mantisbtCategoryId, projectId } = category;
    return await this.bugtrackerCategoriesRepository.insert({
      name,
      projectId,
      mantisbtCategoryId,
    });
  }

  async updateCategory(id: number, category: MantisbtCategoryEntity) {
    const { name, id: mantisbtCategoryId, projectId } = category;
    return await this.bugtrackerCategoriesRepository.update(id, {
      name,
      projectId,
      mantisbtCategoryId,
    });
  }

  async clearCategories() {
    return await this.bugtrackerCategoriesRepository.clear();
  }
}
