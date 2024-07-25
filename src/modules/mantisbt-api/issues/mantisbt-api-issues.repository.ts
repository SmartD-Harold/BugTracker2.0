import { Injectable } from '@nestjs/common';
import { AxiosRepository } from '../../../utils/axios/axios.repository';
import { ClsService } from 'nestjs-cls';
import {
  AddIssueRelationResultType,
  IssuesFromAPIType,
} from './types/api-issues-response.interface';
import { CreateIssueZodType } from './zod/create-issue.zod';

type ApiIssueQueryParams = {
  size: number;
  page: number;
  selectFields?: string[];
  filterId?: string;
  projectId?: string | null;
};

@Injectable()
export class MantisbtApiIssuesRepository extends AxiosRepository {
  constructor(protected readonly cls: ClsService) {
    super('/issues', cls);
  }

  async getIssueById(id: string, selectFields: string[] = []) {
    const url = new URL(`${this.getFullUrl()}/${id}`);
    if (selectFields.length > 0) {
      url.searchParams.append('select', selectFields.join(',').toString());
    }

    const issue = await this.axiosInstance
      .get(url.href)
      .then(({ data }: { data: IssuesFromAPIType }) => data)
      .catch(this.throwHttpException);
    return issue;
  }
  async getIssues({
    size,
    page,
    selectFields,
    projectId = null,
    filterId = null,
  }: ApiIssueQueryParams) {
    const url = new URL(this.getFullUrl());
    url.searchParams.append('page_size', size.toString());
    url.searchParams.append('page', page.toString());

    if (filterId) {
      url.searchParams.append('filter_id', filterId);
    }

    if (selectFields.length > 0) {
      url.searchParams.append('select', selectFields.join(',').toString());
    }

    if (projectId) {
      url.searchParams.append('project_id', projectId);
    }

    const issues = await this.axiosInstance
      .get(url.href)
      .then(
        ({
          data,
        }: {
          data: {
            issues: IssuesFromAPIType[];
          };
        }) => data.issues,
      )
      .catch(this.throwHttpException);
    return issues;
  }

  async createIssue(createTaskDto: any) {
    const { title, description } = createTaskDto;

    const playLoadData = JSON.stringify({
      summary: title,
      description: description,
      category: {
        name: 'General', // Hardcoded
      },
      project: {
        id: 1,
      },
    });

    const task = await this.axiosInstance
      .post(this.apiTargetUrl, playLoadData)
      .then(({ data }: { data: IssuesFromAPIType }) => data)
      .catch(this.throwHttpException);
    return task;
  }

  async newIssue(data: CreateIssueZodType) {
    const playLoadData = JSON.stringify(data);

    const task =
      (await this.axiosInstance
        .post(this.apiTargetUrl, playLoadData)
        .then(
          ({
            data,
          }: {
            data: {
              issue: IssuesFromAPIType;
            };
          }) => data,
        )
        .then(({ issue = {} }) => issue as IssuesFromAPIType)
        .catch(this.throwHttpException)) || {};
    return task as IssuesFromAPIType;
  }

  //Add an issue relationship
  async addIssueRelation({
    formBugId,
    toBugId,
    typeName = 'related-to',
  }: {
    formBugId: number;
    toBugId: number;
    typeName?: string;
  }) {
    const playLoadData = {
      issue: {
        id: toBugId,
      },
      type: {
        name: typeName,
      },
    };

    const result =
      (await this.axiosInstance
        .post(`${this.apiTargetUrl}/${formBugId}/relationships/`, playLoadData)
        .then(({ data }: { data: AddIssueRelationResultType }) => data)
        .catch(this.throwHttpException)) || {};

    return result;
  }
  // Attach a tag to issue
  async attachTagToIssue({
    bugId,
    tags,
  }: {
    bugId: number;
    tags: {
      id?: number;
      name?: string;
    }[];
  }) {
    const result =
      (await this.axiosInstance
        .post(`${this.apiTargetUrl}/${bugId}/tags/`, {
          tags,
        })
        .then(({ data }: { data: AddIssueRelationResultType }) => data)
        .catch(this.throwHttpException)) || {};

    return result;
  }

  async createIssueNote(
    id: number,
    {
      note,
      isPublic = true,
    }: {
      note: string;
      isPublic?: boolean;
    },
  ) {
    console.log('🎯createIssueNote:');
    console.log(note);
    const _note = {
      text: note,
      view_state: {
        name: isPublic ? 'public' : 'private',
      },
    };
    const result = await this.axiosInstance
      .post(`${this.apiTargetUrl}/${id}/notes/`, JSON.stringify(_note))
      .then(({ data }) => data)
      .catch(this.throwHttpException);

    console.log(result);
    return result;
  }

  async deleteIssueNote(id: number, noteId: number) {
    const result = await this.axiosInstance
      .delete(`${this.apiTargetUrl}/${id}/notes/${noteId}`)
      .then(({ data }) => data)
      .catch(this.throwHttpException);

    return result;
  }
}
