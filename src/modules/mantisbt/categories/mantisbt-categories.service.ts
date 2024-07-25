import { Injectable } from '@nestjs/common';
import { MantisbtCategoriesRepository } from './mantisbt-categories.repository';

@Injectable()
export class MantisbtCategoriesService {
  constructor(
    private readonly mantisbtCategoriesRepository: MantisbtCategoriesRepository,
  ) {}

  async findCategories({
    select = null,
    page = 1,
    size = 10,
    orderBy = {},
  } = {}) {
    const _order = Object.keys(orderBy).length > 0 ? orderBy : { id: 'DESC' };
    return await this.mantisbtCategoriesRepository.find({
      select,
      take: size,
      skip: size * (page - 1),
      order: _order,
    });
  }
}
