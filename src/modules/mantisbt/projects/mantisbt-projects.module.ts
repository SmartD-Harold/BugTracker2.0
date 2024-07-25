import { Module } from '@nestjs/common';
import { MantisbtProjectsController } from './mantisbt-projects.controller';
import { MantisbtProjectsService } from './mantisbt-projects.service';
import { MantisbtProjectsRepository } from './mantisbt-projects.repository';
import { MantisbtProjectEntity } from './entity/mantisbt-project.entity';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [MantisbtProjectEntity],
      MantisbtDatabaseConnection,
    ),
  ],
  controllers: [MantisbtProjectsController],
  providers: [MantisbtProjectsService, MantisbtProjectsRepository],
  exports: [MantisbtProjectsService, MantisbtProjectsRepository],
})
export class MantisbtProjectsModule {}
