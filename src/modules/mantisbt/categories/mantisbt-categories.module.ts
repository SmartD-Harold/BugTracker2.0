import { Module } from '@nestjs/common';
import { MantisbtCategoriesController } from './mantisbt-categories.controller';
import { MantisbtCategoriesService } from './mantisbt-categories.service';
import { MantisbtCategoriesRepository } from './mantisbt-categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MantisbtCategoryEntity } from './entity/mantisbt-category.entity';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [MantisbtCategoryEntity],
      MantisbtDatabaseConnection,
    ),
  ],
  controllers: [MantisbtCategoriesController],
  providers: [MantisbtCategoriesService, MantisbtCategoriesRepository],
  exports: [MantisbtCategoriesService, MantisbtCategoriesRepository],
})
export class MantisbtCategoriesModule {}
