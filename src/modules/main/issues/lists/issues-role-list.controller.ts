import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/modules/main/auth/guards/auth.guard';
import { CurrentUserInterceptor } from 'src/modules/main/auth/interceptors/current-user.interceptor';
import { IssuesSerialize } from '../interceptors/issues-serialize.interceptor';
import { IssuesListDto } from '../dto/issues-list.dto';
import { IssuesRoleListService } from './issues-role-list.service';
import { IssuesRoleListDto } from '../dto/issues-role-list.dto';

const IssuesOfRoleEnum = {
  NEW: 'new',
  IN_PROGRESS: 'in-progress',
  LATEST_UPDATED: 'latest-updated',
};

@Controller('issues/lists/role')
export class IssuesRoleListController {
  constructor(private readonly issuesOfRoleService: IssuesRoleListService) {}

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  // @IssuesSerialize()
  @IssuesSerialize(IssuesListDto)
  @Get('new')
  async new() {
    const issuesList = await this.issuesOfRoleService.findIssuesOfNew();

    return {
      title: IssuesOfRoleEnum.NEW,
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @IssuesSerialize(IssuesRoleListDto)
  @Get('in-progress')
  async inProgress() {
    const issuesList = await this.issuesOfRoleService.findIssuesOfInProgress();

    return {
      title: IssuesOfRoleEnum.IN_PROGRESS,
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @IssuesSerialize(IssuesRoleListDto)
  @Get('latest/updated')
  async latestUpdated() {
    const issuesList = await this.issuesOfRoleService.findIssuesByLastUpdated();

    return {
      title: IssuesOfRoleEnum.LATEST_UPDATED,
      maninData: issuesList.mantisbt,
      secondData: issuesList.bugtracker,
    };
  }
}
