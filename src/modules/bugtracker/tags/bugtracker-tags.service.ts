import { Injectable } from '@nestjs/common';
import { BugtrackerTagsRepository } from './bugtracker-tags.repository';
import { BugtrackerTagGroupsRepository } from './bugtracker-tag-groups.repository';
import { BugtrackerTagRelationEnum } from './entity/bugtracker-tag.entity';
import { In } from 'typeorm';
import { BugtrackerTagGroupRelationEnum } from './entity/bugtracker-tag-group.entity';
import { MantisbtTagEntity } from '../../mantisbt/bugs/entity/mantisbt-tag.entity';

@Injectable()
export class BugtrackerTagsService {
  constructor(
    private readonly bugtrackerTagsRepository: BugtrackerTagsRepository,
    private readonly bugtrackerTagGroupsRepository: BugtrackerTagGroupsRepository,
  ) {}

  async getTags({ page = 1, size = 100, orderBy = {} } = {}) {
    orderBy = Object.keys(orderBy).length > 0 ? orderBy : { id: 'ASC' };
    return this.bugtrackerTagsRepository.find({
      take: size,
      skip: size * (page - 1),
      order: orderBy,
      relations: [BugtrackerTagRelationEnum.TAG_GROUP],
    });
  }

  async withTagsById(ids: number[]) {
    return this.getTagsById(ids, {
      select: {
        id: true,
        name: true,
        tagGroupId: true,
        tagGroup: {
          id: true,
          code: true,
          name: true,
        },
      },
    });
  }

  async getTagsById(ids: number[], { select = {} } = {}) {
    return this.bugtrackerTagsRepository.find({
      select,
      where: {
        mantisbtTagId: In(ids),
      },
      relations: [BugtrackerTagRelationEnum.TAG_GROUP],
    });
  }

  async getTagGroupsByTagIds(ids: number[]) {
    return this.bugtrackerTagGroupsRepository.find({
      where: {
        tags: {
          mantisbtTagId: In(ids),
        },
      },
    });
  }

  async getTagGroupsWithTagAndBugCount() {
    return this.bugtrackerTagGroupsRepository.find({
      relations: [BugtrackerTagGroupRelationEnum.TAGS],
    });
  }

  createTag(mantisbtTag: MantisbtTagEntity) {
    return this.bugtrackerTagsRepository.insert({
      mantisbtTagId: mantisbtTag.id,
      name: mantisbtTag.name,
    });
  }

  updateTag(id: number, mantisbtTag: MantisbtTagEntity) {
    return this.bugtrackerTagsRepository.update(id, {
      mantisbtTagId: mantisbtTag.id,
      name: mantisbtTag.name,
    });
  }
}
