import { Injectable } from '@nestjs/common';
import { MantisbtTasksRepository } from './mantisbt-tasks.repository';
import { MantisbtTasksEntity } from './entity/mantisbt-tasks.entity';
import { CreateMantisbtTaskDto } from './dto/create-mantisbt-task.dto';

@Injectable()
export class MantisbtTasksService {
  constructor(private readonly tasksRepository: MantisbtTasksRepository) {}

  async getTasks() {
    return this.tasksRepository.getTasks();
  }

  async getById(id: string) {
    return this.tasksRepository.getById(id);
  }
  createTask(
    createTaskDto: CreateMantisbtTaskDto,
  ): Promise<MantisbtTasksEntity> {
    return this.tasksRepository.createTask(createTaskDto);
  }
}
// nest g service modules/mantisbt/mantisbt-bugs-repository --no-spec
