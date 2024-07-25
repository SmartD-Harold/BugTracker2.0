import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssueSerialize } from './interceptors/issue-serialize.interceptor';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUserInterceptor } from '../auth/interceptors/current-user.interceptor';
import { IssueItemDto } from './dto/issue-item.dto';
import { RelationshipIssueItemDto } from './dto/relationship-issue-item.dto';
import { serviceTargetTypeEnum } from '../../bugtracker/issues/interfaces';
import { MergeIssueType } from './types/merge-issue.interface';
import { MergeFormOptionsInterface } from './types/merge-form-options.interface';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  // @IssueSerialize()
  @IssueSerialize(IssueItemDto)
  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Get('issue/:id')
  async getIssueById(@Param('id', ParseIntPipe) id: number) {
    const issue = await this.issuesService.getIssueById(id);
    return {
      maninData: issue.mantisbt,
      secondData: issue.bugtracker,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Post('issue')
  async createIssue(@Body() data: any) {
    const result = await this.issuesService.createIssue(data);

    return {
      title: 'create bug data',
      data: result,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Get('sync')
  async syncIssues(@Query('page') page?: number, @Query('size') size?: number) {
    const data = await this.issuesService.syncIssues({
      page,
      size,
    });
    return {
      title: 'sync issues',
      data,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Get('form/options')
  async formOptions() {
    const options = await this.issuesService.formOptions();

    return {
      title: 'form options',
      data: options,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Get('form/options/issue/:id')
  async theBugWithFormOptions(@Param('id', ParseIntPipe) id: number) {
    const options = await this.issuesService.formOptions();
    const issue = await this.issuesService.getIssueById(id);

    const _options = options as unknown as MergeFormOptionsInterface;
    const _issue = issue as unknown as MergeIssueType;
    const result = await this.issuesService.mergeIssueAndFormOptions(
      _options,
      _issue,
    );

    console.log('issue');
    console.log(issue);

    return {
      title: 'the issue with form options',
      data: result,
    };
  }

  // @IssueSerialize()
  @IssueSerialize(RelationshipIssueItemDto)
  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Get('relationship/:id')
  async addIssueRelationship(@Param('id', ParseIntPipe) id: number) {
    const issue = await this.issuesService.getIssueById(id);

    return {
      title: 'the issue relationship',
      maninData: issue.mantisbt,
      secondData: issue.bugtracker,
    };
  }

  // @ManyIssueSerialize(RelationshipIssueItemDto)
  // @Get('test/relationship/:id')
  // async testRelationship(@Param('id', ParseIntPipe) id: number) {
  //   const issues = await this.issuesService.getIssueByIds([id, 35, 30]);
  //
  //   return {
  //     title: 'test the issue relationship',
  //     data: issues,
  //   };
  // }

  @Get('test/service-targets')
  async serviceTargets(
    @Query('search') search?: string,
    @Query('type', new ParseIntPipe({ optional: true })) type?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('next', new ParseIntPipe({ optional: true })) next?: number,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('order') order?: string,
  ) {
    const serviceTargetType = serviceTargetTypeEnum[type].name;

    const options = {};
    if (limit) options['limit'] = limit;
    if (next) options['next'] = next;
    if (order) options['orderBy'] = order;
    if (search) options['search'] = search;
    if (page) options['page'] = page;

    if (next === 1) next -= 1;

    const data = await this.issuesService.getServiceTargetData(
      serviceTargetType,
      options,
    );
    return {
      title: 'service targets',
      data,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Post('issue/:id/note')
  async addNoteToIssue(
    @Param('id', ParseIntPipe) id: number,
    @Body('note') note: string,
    @Body('files') files: string, // CSV:nanoid
  ) {
    const result = await this.issuesService.addNoteToIssue(id, {
      note,
      files,
    });
    return {
      title: 'add note to issue',
      data: result,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Patch('issue/:id/note/:noteId')
  async updateNoteByBugId(
    @Param('id', ParseIntPipe) id: number,
    @Param('noteId', ParseIntPipe) noteId: number,
    @Body('note') note: string,
    @Body('files') files: string, // CSV:nanoid
  ) {
    const result = await this.issuesService.updateNoteToIssue(id, noteId, {
      note,
      files,
    });
    return {
      title: 'update note to issue',
      data: result,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Delete('issue/:id/note/:noteId')
  async deleteNoteByBugId(
    @Param('id', ParseIntPipe) id: number,
    @Param('noteId', ParseIntPipe) noteId: number,
  ) {
    const result = await this.issuesService.deleteNoteToIssue(id, noteId);
    return {
      title: 'delete a note',
      data: result,
    };
  }
}
