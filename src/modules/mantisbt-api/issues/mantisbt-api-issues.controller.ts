import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateMantisbtApiIssueDto } from './dto/create-mantisbt-api-issue.dto';
import { MantisbtApiIssuesService } from './mantisbt-api-issues.service';

// RouterModule: mantisbt/api/tasks
@Controller()
export class MantisbtApiIssuesController {
  constructor(
    private readonly mantisbtIssuesService: MantisbtApiIssuesService,
  ) {}
  @Get()
  getIssues(
    @Query('size') size: number = 10,
    @Query('page') page: number = 1,
    @Query('select') select: string,
    @Query('filterId') filterId: string | null = null,
    @Query('projectId') projectId: string | null = null,
  ) {
    const selectFields = select ? select.split(',') : [];
    return this.mantisbtIssuesService.getIssues({
      size,
      page,
      selectFields,
      filterId,
      projectId,
    });
  }

  @Get('/:id')
  getIssueById(@Param('id') id: string, @Query('select') select: string) {
    const selectFields = select ? select.split(',') : [];
    return this.mantisbtIssuesService.getIssueById(id, selectFields);
  }

  @Post()
  createIssue(@Body() createTaskDto: CreateMantisbtApiIssueDto) {
    return this.mantisbtIssuesService.createTask(createTaskDto);
  }
}
