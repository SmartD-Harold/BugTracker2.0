import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUserInterceptor } from '../auth/interceptors/current-user.interceptor';
import { TagsSerialize } from './interceptors/tags-serialize.interceptor';
import { TagsDto } from './dto/tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get('')
  async tags() {
    return this.tagsService.getTags();
  }

  @Get('bugs/count')
  async tagsWithBugCount() {
    return this.tagsService.getTagsWithBugCount();
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @TagsSerialize(TagsDto)
  @Get('groups/bugs/count')
  async tagGroupsWithTagsAndBugCount() {
    const tagAndGroup =
      await this.tagsService.getTagGroupsWithTagsAndBugCount();
    return {
      title: 'tags & groups with bug count',
      tags: tagAndGroup.tags,
      groups: tagAndGroup.groups,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Get('sync')
  async syncTags(@Query('page') page?: number, @Query('size') size?: number) {
    const data = await this.tagsService.syncTags({
      page,
      size,
    });
    return {
      title: 'sync tags',
      data,
    };
  }
}
