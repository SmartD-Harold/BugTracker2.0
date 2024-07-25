import { Injectable } from '@nestjs/common';
import { MantisbtTagsService } from '../../mantisbt/bugs/mantisbt-tags.service';
import { ResultToPlainWithoutMap } from '../../../decorators/result-to-plain.decorator';
import { plainToInstance } from 'class-transformer';
import { BugtrackerTagsService } from '../../bugtracker/tags/bugtracker-tags.service';
import { MantisbtTagEntity } from '../../mantisbt/bugs/entity/mantisbt-tag.entity';
import { TagGroupsDto, TagsDto } from './dto/tags.dto';

@Injectable()
export class TagsService {
  constructor(
    private readonly mantisbtTagsService: MantisbtTagsService,
    private readonly bugtrackerTagsService: BugtrackerTagsService,
  ) {}

  async syncTags({ page = 1, size = 300 } = {}) {
    let updated = 0;
    let created = 0;

    const options = { page, size, orderBy: { id: 'ASC' } };
    const mantisbtTags = await this.mantisbtTagsService.findTags(options);
    const bugtrackerTags = await this.bugtrackerTagsService.getTags(options);

    const bugtrackerTagsIds =
      bugtrackerTags.map((tag) => tag.mantisbtTagId) || [];
    for (const mantisbtTag of mantisbtTags) {
      const hasTag = bugtrackerTagsIds.includes(mantisbtTag.id);
      if (!hasTag) {
        await this.bugtrackerTagsService.createTag(mantisbtTag);
        created++;
      } else {
        const bugtrackerTag = bugtrackerTags.find(
          (tag) => tag.mantisbtTagId === mantisbtTag.id,
        );
        await this.bugtrackerTagsService.updateTag(
          bugtrackerTag.id,
          mantisbtTag,
        );
        updated++;
      }
    }

    return {
      updated,
      created,
    };
  }

  @ResultToPlainWithoutMap()
  async getTags() {
    const mantisbtTags = await this.mantisbtTagsService.findTags();

    const mantisbtTagsIds = mantisbtTags.map((tag) => tag.id) || [];
    const bugtrackerTags =
      await this.bugtrackerTagsService.getTagsById(mantisbtTagsIds);

    return {
      mantisbt: mantisbtTags,
      bugtracker: bugtrackerTags,
    };
  }

  @ResultToPlainWithoutMap()
  async getTagsWithBugCount() {
    const mantisbtTags = await this.mantisbtTagsService.findTagsWithBugCount();

    const mantisbtTagsIds = mantisbtTags.map((tag) => tag.id) || [];
    const bugtrackerTags =
      await this.bugtrackerTagsService.getTagsById(mantisbtTagsIds);

    return {
      mantisbt: mantisbtTags,
      bugtracker: bugtrackerTags,
    };
  }

  @ResultToPlainWithoutMap()
  async getTagGroupsWithTagsAndBugCount() {
    type MantisbtTag = (MantisbtTagEntity & {
      bugCount?: number;
    })[];
    const mantisbtTags: MantisbtTag =
      await this.mantisbtTagsService.findTagsWithBugCount();

    const mantisbtTagsIds = mantisbtTags.map((tag) => tag.id) || [];
    const bugtrackerTagGroups =
      await this.bugtrackerTagsService.getTagGroupsByTagIds(mantisbtTagsIds);

    const bugtrackerTags =
      await this.bugtrackerTagsService.getTagsById(mantisbtTagsIds);

    const tags = bugtrackerTags.map((tag) => {
      const mantisbtTag = mantisbtTags.find(
        (mantisbtTag) => mantisbtTag.id === tag.mantisbtTagId,
      );
      return {
        id: tag.id,
        mantisbtTagId: tag.mantisbtTagId,
        name: tag.name,
        description: mantisbtTag.description,
        bugCount: mantisbtTag.bugCount,
        tagGroupId: tag?.tagGroupId || null,
        tagGroup: tag?.tagGroup || null,
      };
    });

    if (tags.length > 0) {
      tags.sort((a, b) => a.tagGroupId - b.tagGroupId);
    }

    const groups = bugtrackerTagGroups.map((group) => {
      const _tags = tags.filter((tag) => tag.tagGroupId === group.id) || [];
      const lists = _tags.map((tag) => tag.mantisbtTagId) || [];
      return {
        id: group.id,
        code: group.code,
        name: group.name,
        count: lists.length || 0,
        lists,
      };
    });

    return {
      tags: tags,
      groups: plainToInstance(TagGroupsDto, groups),
    };
  }
}
