import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TagsRepository } from './tags.repository';
import { MantisbtBugsModule } from '../../mantisbt/bugs/mantisbt-bugs.module';
import { BugtrackerTagsModule } from '../../bugtracker/tags/bugtracker-tags.module';

@Module({
  imports: [MantisbtBugsModule, BugtrackerTagsModule],
  controllers: [TagsController],
  providers: [TagsService, TagsRepository],
  exports: [TagsService],
})
export class TagsModule {}
