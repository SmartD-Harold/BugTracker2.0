import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BugtrackerProjectFunctionEntity } from './entity/bugtracker-project-function.entity';
import { BugtrackerProjectFunctionsRepository } from './bugtracker-project-functions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BugtrackerProjectFunctionEntity])],
  providers: [BugtrackerProjectFunctionsRepository],
  exports: [BugtrackerProjectFunctionsRepository],
})
export class BugtrackerProjectFunctionsModule {}
