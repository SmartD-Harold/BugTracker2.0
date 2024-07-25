import { Module } from '@nestjs/common';
import { MantisbtApiProjectsService } from './mantisbt-api-projects.service';
import { MantisbtApiProjectsRepository } from './mantisbt-api-projects.repository';
// import { REQUEST } from '@nestjs/core';

@Module({
  providers: [MantisbtApiProjectsService, MantisbtApiProjectsRepository],
  exports: [MantisbtApiProjectsService],
})
export class MantisbtApiProjectsModule {}
