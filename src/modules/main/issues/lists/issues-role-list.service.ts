import { Injectable } from '@nestjs/common';
import { BugtrackerIssuesService } from '../../../bugtracker/issues/bugtracker-issues.service';
import { MantisbtBugsService } from '../../../mantisbt/bugs/mantisbt-bugs.service';
import { IssuesService } from '../issues.service';
import { ResultToPlainWithoutMap } from '../../../../decorators/result-to-plain.decorator';
import { MantisbtBugEntity } from '../../../mantisbt/bugs/entity/mantisbt-bug.entity';

@Injectable()
export class IssuesRoleListService {
  constructor(
    private readonly issuesService: IssuesService,
    private readonly mantisbtBugsService: MantisbtBugsService,
    private readonly bugtrackerIssuesService: BugtrackerIssuesService,
  ) {}

  async findIssuesOfNew() {
    const mantisbtIssues =
      await this.mantisbtBugsService.findIssuesOfUnassignedUser();

    return await this.issuesService.dataWithBugtracker(mantisbtIssues);
  }

  @ResultToPlainWithoutMap()
  async findIssuesOfInProgress() {
    const myRoles = this.issuesService.getRolesOfCurrentUser();

    const bugtrackerIssues =
      await this.bugtrackerIssuesService.getIssuesMapDataByRoleId(myRoles);

    let mantisbtIssues: MantisbtBugEntity[] = [];
    if (bugtrackerIssues.size > 0) {
      mantisbtIssues = await this.mantisbtBugsService.findIssuesOfInProgress([
        ...bugtrackerIssues.keys(),
      ]);
    }

    return await this.issuesService.dataWithBugtracker(
      mantisbtIssues,
      bugtrackerIssues,
    );
  }

  @ResultToPlainWithoutMap()
  async findIssuesByLastUpdated() {
    const roles = this.issuesService.getRolesOfCurrentUser();
    const bugtrackerIssues =
      await this.bugtrackerIssuesService.getIssuesMapDataByRoleId(roles);

    let mantisbtIssues: MantisbtBugEntity[] = [];
    if (bugtrackerIssues.size > 0) {
      mantisbtIssues = await this.mantisbtBugsService.findIssuesByLastUpdated([
        ...bugtrackerIssues.keys(),
      ]);
    }

    return await this.issuesService.dataWithBugtracker(
      mantisbtIssues,
      bugtrackerIssues,
    );
  }
}
