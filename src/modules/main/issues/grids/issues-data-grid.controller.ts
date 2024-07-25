import {
  Controller,
  createParamDecorator,
  ExecutionContext,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { camelizeKeys } from 'humps';
import { AuthGuard } from 'src/modules/main/auth/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/modules/main/auth/interceptors/current-user.interceptor';
import { IssuesSerialize } from '../interceptors/issues-serialize.interceptor';
import { IssuesListDto } from '../dto/issues-list.dto';
import { IssuesDataGridService } from './issues-data-grid.service';
import { IssuesService } from '../issues.service';
import { GetBasicDataGridDto } from '../dto/get-basic-data-grid.dto';

@Controller('issues/grids')
export class IssuesDataGridController {
  constructor(
    private readonly issuesService: IssuesService,
    private readonly issuesDataGridService: IssuesDataGridService,
  ) {}

  @IssuesSerialize(IssuesListDto)
  @UseInterceptors(CurrentUserInterceptor)
  // @IssuesSerialize()
  @UseGuards(new AuthGuard())
  @UsePipes(
    new ValidationPipe({
      transform: true,
      // whitelist: true,
    }),
  )
  @Get('basic')
  async basicDataGrid(@Query() query: GetBasicDataGridDto) {
    console.log('🎯basicDataGrid');
    console.log('query', query);
    const issues = await this.issuesDataGridService.findBasicIssues({
      ...query,
    });

    console.log('basicDataGrid issues');
    console.log(issues);
    return {
      title: 'basic data grid',
      maninData: issues.mantisbt,
      secondData: issues.bugtracker,
    };
  }
  @UseInterceptors(CurrentUserInterceptor)
  @UseGuards(new AuthGuard())
  // @IssuesSerialize(MiniIssuesDto)
  @Get('advance')
  async advanceDataGrid() {
    return {
      title: 'advance data grid',
      maninData: [],
      secondData: new Map(),
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  // @IssuesSerialize(MiniIssuesDto)
  @Get('future')
  async futureDataGrid() {
    return {
      title: 'future data grid',
      maninData: [],
      secondData: new Map(),
    };
  }
}
