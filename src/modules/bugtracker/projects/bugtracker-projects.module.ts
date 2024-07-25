import { Module } from '@nestjs/common';
import { BugtrackerProjectsService } from './bugtracker-projects.service';
import { BugtrackerProjectsRepository } from './bugtracker-projects.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BugtrackerProjectEntity } from './entity/bugtracker-project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BugtrackerProjectEntity])],
  providers: [BugtrackerProjectsService, BugtrackerProjectsRepository],
  exports: [BugtrackerProjectsService, BugtrackerProjectsRepository],
})
export class BugtrackerProjectsModule {}
