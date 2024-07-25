import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { MantisbtTasksController } from './mantisbt-tasks.controller';
import { MantisbtTasksService } from './mantisbt-tasks.service';
import { MantisbtTasksEntity } from './entity/mantisbt-tasks.entity';
import { MantisbtTasksRepository } from './mantisbt-tasks.repository';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([MantisbtTasksEntity], MantisbtDatabaseConnection),
  ],
  controllers: [MantisbtTasksController],
  providers: [
    MantisbtTasksService,
    {
      provide: MantisbtTasksRepository,
      useFactory: (dataSource: DataSource) => {
        return new MantisbtTasksRepository(dataSource);
      },
      inject: [getDataSourceToken(MantisbtDatabaseConnection)],
    },
  ],
  exports: [MantisbtTasksService],
})
export class MantisbtTasksModule {}
