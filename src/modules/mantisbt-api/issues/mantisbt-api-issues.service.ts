import { Injectable } from '@nestjs/common';
import { MantisbtApiIssuesRepository } from './mantisbt-api-issues.repository';
import { CreateMantisbtApiIssueDto } from './dto/create-mantisbt-api-issue.dto';
import { IssuesFromAPIType } from './types/api-issues-response.interface';
import { CreateIssueZod, CreateIssueZodType } from './zod/create-issue.zod';
import { FormDataZod, FormDataZodType } from './zod/form-data.zod';

@Injectable()
export class MantisbtApiIssuesService {
  constructor(
    private readonly mantisbtApiIssuesRepository: MantisbtApiIssuesRepository,
  ) {}

  async getIssues({
    size = 10,
    page = 1,
    selectFields = [],
    filterId = null,
    projectId = null,
  } = {}): Promise<void | IssuesFromAPIType[]> {
    console.log('🎯MantisbtApiIssuesService.getIssues');
    const results = await this.mantisbtApiIssuesRepository
      .settingCurrentUser()
      .getIssues({
        size,
        page,
        selectFields,
        projectId,
        filterId,
      });
    return results;
  }

  async getIssueById(id: string, selectFields: string[] = []) {
    return this.mantisbtApiIssuesRepository
      .settingCurrentUser()
      .getIssueById(id, selectFields);
  }

  createTask(
    createMantisbtTaskDto: CreateMantisbtApiIssueDto,
  ): Promise<void | IssuesFromAPIType> {
    return this.mantisbtApiIssuesRepository
      .settingCurrentUser()
      .createIssue(createMantisbtTaskDto);
  }

  async newTask(data: any) {
    let _data: FormDataZodType | CreateIssueZodType = FormDataZod.parse(
      data,
    ) as FormDataZodType;
    _data = CreateIssueZod.parse(_data) as CreateIssueZodType;
    return await this.mantisbtApiIssuesRepository
      .settingCurrentUser()
      .newIssue(_data);
  }

  // Add an issue relationship
  async addIssueRelation({
    formBugId,
    toBugId,
    typeName = 'related-to',
  }: {
    formBugId: number;
    toBugId: number;
    typeName?: string;
  }) {
    return await this.mantisbtApiIssuesRepository
      .settingCurrentUser()
      .addIssueRelation({
        formBugId,
        toBugId,
        typeName,
      });
  }

  async attachTagsToIssue({
    bugId,
    tags,
  }: {
    bugId: number;
    tags: {
      id?: number;
      name?: string;
    }[];
  }) {
    return await this.mantisbtApiIssuesRepository
      .settingCurrentUser()
      .attachTagToIssue({
        bugId,
        tags,
      });
  }

  async createIssueNote(
    id: number,
    noteData: {
      note: string;
      isPublic?: boolean;
    },
  ) {
    return await this.mantisbtApiIssuesRepository
      .settingCurrentUser()
      .createIssueNote(id, noteData);
  }

  async deleteIssueNote(id: number, noteId: number) {
    return await this.mantisbtApiIssuesRepository
      .settingCurrentUser()
      .deleteIssueNote(id, noteId);
  }
}
