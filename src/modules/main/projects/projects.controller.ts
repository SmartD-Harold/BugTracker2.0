import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUserInterceptor } from '../auth/interceptors/current-user.interceptor';
import { MiniProjectsDto } from './dto/mini-projects.dto';
import { IssuesSerialize } from './interceptors/issues-serialize.interceptor';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  // @IssuesSerialize()
  @IssuesSerialize(MiniProjectsDto)
  @Get('')
  async projects() {
    const projects = await this.projectsService.getProjects();
    return {
      title: 'all',
      maninData: projects.mantisbt,
      secondData: projects.bugtracker,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @IssuesSerialize(MiniProjectsDto)
  @Get('me')
  async myProjects() {
    const projects = await this.projectsService.getMyProjects();
    return {
      title: 'my-projects',
      maninData: projects.mantisbt,
      secondData: projects.bugtracker,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Get('sync')
  async syncProjects(
    @Query('page') page?: number,
    @Query('size') size?: number,
  ) {
    const data = await this.projectsService.syncProjects({
      page,
      size,
    });
    return {
      title: 'sync projects',
      data,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Get('project/:id/form/options')
  async formOptions(@Param('id', ParseIntPipe) id: number) {
    const options =
      await this.projectsService.getServiceTargetsAndProjectFunctions(id);

    return {
      title: 'form options',
      data: options,
    };
  }
}
