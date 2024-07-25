import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MantisbtBugsService } from './mantisbt-bugs.service';
import { AuthGuard } from '../../main/auth/guards/auth.guard';
import { CurrentUserInterceptor } from '../../main/auth/interceptors/current-user.interceptor';
import { MantisbtTagsService } from './mantisbt-tags.service';

@Controller('bugs')
export class MantisbtBugsController {
  constructor(
    private readonly mantisbtBugsService: MantisbtBugsService,
    private readonly mantisbtTagsService: MantisbtTagsService,
  ) {}

  @Get()
  async getBugs() {
    return this.mantisbtBugsService.findBugs();
  }

  @Get('tags')
  async tags() {
    return this.mantisbtTagsService.findTags();
  }

  @Get('tags/count')
  async tagsWithBugCount() {
    return this.mantisbtTagsService.findTagsWithBugCount();
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Get(':id')
  async getBugById(@Param('id', ParseIntPipe) id: number) {
    return this.mantisbtBugsService.findBugById(id);
  }
}
