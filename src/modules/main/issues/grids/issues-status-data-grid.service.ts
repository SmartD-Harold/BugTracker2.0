import { Injectable } from '@nestjs/common';
import { MantisbtBugsService } from '../../../mantisbt/bugs/mantisbt-bugs.service';
import { IssuesService } from '../issues.service';

@Injectable()
export class IssuesStatusDataGridService {
  constructor(
    private readonly issuesService: IssuesService,
    private readonly mantisbtBugsService: MantisbtBugsService,
  ) {}

  async findIssuesOfStatus(key: number) {
    const mantisbtIssues =
      await this.mantisbtBugsService.findIssuesOfStatus(key);

    return await this.issuesService.dataWithBugtracker(mantisbtIssues);
  }
}
