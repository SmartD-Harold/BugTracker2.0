import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MantisbtCategoriesModule } from '../../mantisbt/categories/mantisbt-categories.module';
import { BugtrackerCategoriesModule } from '../../bugtracker/categories/bugtracker-categories.module';

@Module({
  imports: [MantisbtCategoriesModule, BugtrackerCategoriesModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
