import { Injectable } from '@nestjs/common';
import { MantisbtBugsService } from '../../../mantisbt/bugs/mantisbt-bugs.service';
import { IssuesService } from '../issues.service';

@Injectable()
export class IssuesDataGridService {
  constructor(
    private readonly issuesService: IssuesService,
    private readonly mantisbtBugsService: MantisbtBugsService,
  ) {}

  async findBasicIssues(options = {}) {
    const mantisbtIssues =
      await this.mantisbtBugsService.findIssuesDataGrid(options);

    return await this.issuesService.dataWithBugtracker(mantisbtIssues);
  }
}
