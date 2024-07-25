import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MantisbtTasksService } from './mantisbt-tasks.service';
import { CreateMantisbtTaskDto } from './dto/create-mantisbt-task.dto';

@Controller('mantisbt/db/tasks')
export class MantisbtTasksController {
  constructor(private readonly tasksService: MantisbtTasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateMantisbtTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }
}
