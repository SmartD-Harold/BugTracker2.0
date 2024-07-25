import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MantisbtTasksEntity } from './entity/mantisbt-tasks.entity';
import { MantisbtTaskStatusEnum } from './types/mantisbt-task-status.enum';
import { CreateMantisbtTaskDto } from './dto/create-mantisbt-task.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';

@Injectable()
export class MantisbtTasksRepository extends Repository<MantisbtTasksEntity> {
  constructor(
    @InjectDataSource(MantisbtDatabaseConnection)
    protected dataSource: DataSource,
  ) {
    super(MantisbtTasksEntity, dataSource.createEntityManager());
  }

  async getTasks() {
    return this.find();
  }

  async getById(id: string) {
    return this.findOne({ where: { id } });
  }

  async createTask(
    createTaskDto: CreateMantisbtTaskDto,
  ): Promise<MantisbtTasksEntity> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: MantisbtTaskStatusEnum.OPEN,
    });

    await this.save(task);
    return task;
  }
}
