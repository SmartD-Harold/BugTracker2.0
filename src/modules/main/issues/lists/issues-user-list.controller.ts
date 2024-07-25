import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/modules/main/auth/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/modules/main/auth/interceptors/current-user.interceptor';
import { IssuesSerialize } from '../interceptors/issues-serialize.interceptor';
import { IssuesUserListService } from './issues-user-list.service';
import { IssuesListDto } from '../dto/issues-list.dto';

const IssuesOfUserEnum = {
  ASSIGNED: 'assigned',
  REPORTED: 'reported',
  MONITORED: 'monitored',
  LATEST_VIEWED: 'latest-viewed',
  LATEST_UPDATED: 'latest-updated',
};

@Controller('issues/lists/user')
export class IssuesUserListController {
  constructor(private readonly issuesOfUserService: IssuesUserListService) {}

  // @IssuesSerialize()
  @IssuesSerialize(IssuesListDto)
  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Get('me/assigned')
  async assignToMe() {
    const issuesList =
      await this.issuesOfUserService.findIssuesOfAssignedToMe();

    return {
      title: IssuesOfUserEnum.ASSIGNED,
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }

  // @IssuesSerialize()
  @IssuesSerialize(IssuesListDto)
  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Get('me/reported')
  async reportByMe() {
    const issuesList =
      await this.issuesOfUserService.findIssuesOfReportedByMe();

    return {
      title: IssuesOfUserEnum.REPORTED,
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @IssuesSerialize(IssuesListDto)
  @Get('me/monitored')
  async monitoredByMe() {
    const issuesList =
      await this.issuesOfUserService.findIssuesOfMonitoredByMe();

    return {
      title: IssuesOfUserEnum.MONITORED,
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @IssuesSerialize(IssuesListDto)
  @Get('me/latest/viewed')
  async latestViewed() {
    const issuesList =
      await this.issuesOfUserService.findIssuesOfLatestViewedByMe();

    return {
      title: IssuesOfUserEnum.LATEST_VIEWED,
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @IssuesSerialize(IssuesListDto)
  @Get('me/latest/updated')
  async latestUpdated() {
    const issuesList =
      await this.issuesOfUserService.findIssuesByLastUpdatedByMe();

    return {
      title: IssuesOfUserEnum.LATEST_UPDATED,
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }
}
