import { Module } from '@nestjs/common';
import { BugtrackerCategoriesService } from './bugtracker-categories.service';
import { BugtrackerCategoriesRepository } from './bugtracker-categories.repository';

@Module({
  providers: [BugtrackerCategoriesService, BugtrackerCategoriesRepository],
  exports: [BugtrackerCategoriesService, BugtrackerCategoriesRepository],
})
export class BugtrackerCategoriesModule {}
