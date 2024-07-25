import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/modules/main/auth/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/modules/main/auth/interceptors/current-user.interceptor';
import { IssuesSerialize } from '../interceptors/issues-serialize.interceptor';
import { IssuesListDto } from '../dto/issues-list.dto';
import { IssuesDataGridService } from './issues-data-grid.service';
import {
  StatusMappingEnum,
  StatusMappingKeyEnum,
} from '../../../mantisbt/bugs/interfaces';

@Controller('issues/grids/status')
export class IssuesStatusDataGridController {
  constructor(private readonly issuesDataGridService: IssuesDataGridService) {}

  private getStatusMappingName(key: number) {
    return StatusMappingEnum[key].name;
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  // @IssuesSerialize(MiniIssuesDto)
  @Get('new')
  async newDataGrid() {
    return {
      title: 'new data grid',
      maninData: [],
      secondData: new Map(),
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  // @IssuesSerialize(MiniIssuesDto)
  @Get('feedback')
  async feedbackDataGrid() {
    return {
      title: 'feedback data grid',
      maninData: [],
      secondData: new Map(),
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  // @IssuesSerialize(MiniIssuesDto)
  @Get('backlog')
  async backlogDataGrid() {
    return {
      title: 'backlog data grid',
      maninData: [],
      secondData: new Map(),
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  // @IssuesSerialize(MiniIssuesDto)
  @Get('todo')
  async todoDataGrid() {
    return {
      title: 'todo data grid',
      maninData: [],
      secondData: new Map(),
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  // @IssuesSerialize(MiniIssuesDto)
  @Get('doing')
  async doingDataGrid() {
    return {
      title: 'doing data grid',
      maninData: [],
      secondData: new Map(),
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  // @IssuesSerialize(MiniIssuesDto)
  @Get('resolved')
  async resolvedDataGrid() {
    return {
      title: 'resolved data grid',
      maninData: [],
      secondData: new Map(),
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  // @IssuesSerialize(MiniIssuesDto)
  @Get('completed')
  async completedDataGrid() {
    return {
      title: 'completed data grid',
      maninData: [],
      secondData: new Map(),
    };
  }
}
