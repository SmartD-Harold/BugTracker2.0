import { Injectable } from '@nestjs/common';
import { BugtrackerCategoriesService } from '../../bugtracker/categories/bugtracker-categories.service';
import { MantisbtCategoriesService } from '../../mantisbt/categories/mantisbt-categories.service';
import { MantisbtCategoriesRepository } from '../../mantisbt/categories/mantisbt-categories.repository';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly bugtrackerCategoriesService: BugtrackerCategoriesService,
    private readonly mantisbtCategoriesService: MantisbtCategoriesService,
    private readonly mantisbtCategoriesRepository: MantisbtCategoriesRepository,
  ) {}

  async getFormDisplayCategories() {
    const _categories = await this.mantisbtCategoriesRepository.find();

    return _categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
      };
    });
  }

  async syncCategories({ page = 1, size = 100 } = {}) {
    let created = 0;

    const mantisbtCategories =
      await this.mantisbtCategoriesService.findCategories({
        page,
        size,
        orderBy: {
          id: 'ASC',
        },
      });

    await this.bugtrackerCategoriesService.clearCategories();

    for (const mantisbtCategory of mantisbtCategories) {
      await this.bugtrackerCategoriesService.createCategory(mantisbtCategory);
      created++;
    }

    return {
      created,
    };
  }
}
