import { Injectable } from '@nestjs/common';
import { MantisbtTagsRepository } from './mantisbt-tags.repository';
import { mantisbtTagRelations } from './entity/mantisbt-tag.entity';

@Injectable()
export class MantisbtTagsService {
  constructor(
    private readonly mantisbtTagsRepository: MantisbtTagsRepository,
  ) {}

  async findTags({ page = 1, size = 100, orderBy = {} } = {}) {
    orderBy = Object.keys(orderBy).length > 0 ? orderBy : { id: 'ASC' };
    return await this.mantisbtTagsRepository.find({
      take: size,
      skip: size * (page - 1),
      order: orderBy,
      relations: [mantisbtTagRelations.bugs],
    });
  }

  async findTagsWithBugCount() {
    return await this.mantisbtTagsRepository.findTagsWithBugCount();
  }

  async findTagsWithBugCountByIds(ids: number[]) {
    return await this.mantisbtTagsRepository.findTagsWithBugCountByIds(ids);
  }
}
