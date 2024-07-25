import { Injectable } from '@nestjs/common';
import { MantisbtBugsService } from '../../../mantisbt/bugs/mantisbt-bugs.service';
import { IssuesService } from '../issues.service';

@Injectable()
export class IssuesUserListService {
  constructor(
    private readonly issuesService: IssuesService,
    private readonly mantisbtBugsService: MantisbtBugsService,
  ) {}

  async findIssuesOfAssignedToMe() {
    const mantisbtIssues =
      await this.mantisbtBugsService.findIssuesOfAssignedToMe(
        this.issuesService.getCurrentUserId(),
      );

    return await this.issuesService.dataWithBugtracker(mantisbtIssues);
  }

  async findIssuesOfReportedByMe() {
    const mantisbtIssues =
      await this.mantisbtBugsService.findIssuesOfReportedByMe(
        this.issuesService.getCurrentUserId(),
      );
    return await this.issuesService.dataWithBugtracker(mantisbtIssues);
  }

  async findIssuesOfMonitoredByMe() {
    const mantisbtIssues =
      await this.mantisbtBugsService.findIssuesOfMonitoredByMe(
        this.issuesService.getCurrentUserId(),
      );

    return await this.issuesService.dataWithBugtracker(mantisbtIssues);
  }

  async findIssuesOfLatestViewedByMe() {
    const mantisbtIssues =
      await this.mantisbtBugsService.findIssuesOfLatestViewedByMe(
        this.issuesService.getCurrentUserId(),
      );
    return await this.issuesService.dataWithBugtracker(mantisbtIssues);
  }

  async findIssuesByLastUpdatedByMe() {
    const mantisbtIssues =
      await this.mantisbtBugsService.findIssuesByLastUpdatedByMe(
        this.issuesService.getCurrentUserId(),
      );

    return await this.issuesService.dataWithBugtracker(mantisbtIssues);
  }
}
