import { Module } from '@nestjs/common';
import { BugtrackerTagsController } from './bugtracker-tags.controller';
import { BugtrackerTagsService } from './bugtracker-tags.service';
import { BugtrackerTagsRepository } from './bugtracker-tags.repository';
import { BugtrackerTagGroupsRepository } from './bugtracker-tag-groups.repository';

@Module({
  controllers: [BugtrackerTagsController],
  providers: [
    BugtrackerTagsService,
    BugtrackerTagsRepository,
    BugtrackerTagGroupsRepository,
  ],
  exports: [
    BugtrackerTagsService,
    BugtrackerTagsRepository,
    BugtrackerTagGroupsRepository,
  ],
})
export class BugtrackerTagsModule {}
