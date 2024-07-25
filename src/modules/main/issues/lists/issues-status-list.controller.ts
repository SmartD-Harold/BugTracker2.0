import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/modules/main/auth/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/modules/main/auth/interceptors/current-user.interceptor';
import { IssuesSerialize } from '../interceptors/issues-serialize.interceptor';
import { IssuesListDto } from '../dto/issues-list.dto';
import { IssuesStatusListService } from './issues-status-list.service';
import {
  StatusMappingEnum,
  StatusMappingKeyEnum,
} from '../../../mantisbt/bugs/interfaces';

@Controller('issues/lists/status')
export class IssuesStatusListController {
  constructor(
    private readonly issuesOfStatusService: IssuesStatusListService,
  ) {}

  private getStatusMappingName(key: number) {
    return StatusMappingEnum[key].name;
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @IssuesSerialize(IssuesListDto)
  @Get('new')
  async new() {
    const statusKey = StatusMappingKeyEnum.new_10;
    const issuesList =
      await this.issuesOfStatusService.findIssuesOfStatus(statusKey);

    return {
      title: this.getStatusMappingName(statusKey),
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @IssuesSerialize(IssuesListDto)
  @Get('feedback')
  async feedback() {
    const statusKey = StatusMappingKeyEnum.feedback_20;
    const issuesList =
      await this.issuesOfStatusService.findIssuesOfStatus(statusKey);

    return {
      title: this.getStatusMappingName(statusKey),
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @IssuesSerialize(IssuesListDto)
  @Get('backlog')
  async backlog() {
    const statusKey = StatusMappingKeyEnum.backlog_30;
    const issuesList =
      await this.issuesOfStatusService.findIssuesOfStatus(statusKey);

    return {
      title: this.getStatusMappingName(statusKey),
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @IssuesSerialize(IssuesListDto)
  @Get('todo')
  async todo() {
    const statusKey = StatusMappingKeyEnum.todo_40;
    const issuesList =
      await this.issuesOfStatusService.findIssuesOfStatus(statusKey);

    return {
      title: this.getStatusMappingName(statusKey),
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @IssuesSerialize(IssuesListDto)
  @Get('doing')
  async doing() {
    const statusKey = StatusMappingKeyEnum.doing_50;
    const issuesList =
      await this.issuesOfStatusService.findIssuesOfStatus(statusKey);

    return {
      title: this.getStatusMappingName(statusKey),
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @IssuesSerialize(IssuesListDto)
  @Get('resolved')
  async resolved() {
    const statusKey = StatusMappingKeyEnum.resolved_80;
    const issuesList =
      await this.issuesOfStatusService.findIssuesOfStatus(statusKey);

    return {
      title: this.getStatusMappingName(statusKey),
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @IssuesSerialize(IssuesListDto)
  @Get('completed')
  async completed() {
    const statusKey = StatusMappingKeyEnum.completed_90;
    const issuesList =
      await this.issuesOfStatusService.findIssuesOfStatus(statusKey);

    return {
      title: this.getStatusMappingName(statusKey),
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }
}
