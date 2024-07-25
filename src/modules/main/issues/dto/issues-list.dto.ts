import { Expose, Transform, Type } from 'class-transformer';
import { BugtrackerAzureWorkItemEntity } from '../../../bugtracker/issues/entity/bugtracker-azure-work-item.entity';
import {
  DbAzureWorkItemType,
  DbAzureWorkItemZod,
} from '../../azure/zod/db-azure-work-item.zod';

class BasePropertyIssueDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  label: string;
}

class Category {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

class Project {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  status: BasePropertyIssueDto;

  @Expose()
  @Transform(({ value }) => !!value)
  enabled: boolean;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  viewState: BasePropertyIssueDto;
}

class AzureTasksDto {
  @Expose()
  id: number;

  @Expose()
  statusId: string;

  @Expose()
  statusLabel: string;

  @Expose()
  link: string;

  @Expose()
  isClosed: boolean;
}

class ApartmentComplexDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  city: string;

  @Expose()
  dist?: string;
}

class projectFunctionMiniDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

class User {
  @Expose()
  id: number;

  @Expose()
  name: string;

  // @Expose()
  realName: string;

  @Expose()
  email: string;
}

class HandlerUser extends User {
  @Expose()
  title: string;

  @Expose()
  dept: string;
}

class DataOfIssuesListDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  serviceTargetType: BasePropertyIssueDto;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  statueCode: BasePropertyIssueDto;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  subStatueCode: BasePropertyIssueDto;

  @Expose()
  handlerType: string;

  @Expose()
  handlerId: number;

  @Expose()
  handlerUserId: number;

  // @Expose()
  // @Type(() => AzureTasksDto)
  // azureTasks: AzureTasksDto;

  @Expose()
  @Type(() => ApartmentComplexDto)
  apartmentComplex?: ApartmentComplexDto;

  @Expose()
  @Type(() => ApartmentComplexDto)
  constructionCompany?: ApartmentComplexDto;

  @Expose()
  @Type(() => ApartmentComplexDto)
  estateManagementCompany?: ApartmentComplexDto;

  @Expose()
  @Type(() => projectFunctionMiniDto)
  projectFunction: projectFunctionMiniDto;

  @Expose()
  @Transform(({ value }) => {
    if (!value) return value;
    return value.map((azureWorkItem: BugtrackerAzureWorkItemEntity) => {
      return DbAzureWorkItemZod.parse(azureWorkItem);
    });
  })
  azureWorkItems: DbAzureWorkItemType[];
}

export class IssuesListDto {
  @Expose()
  id: number;

  @Expose()
  projectId: number;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  priority: BasePropertyIssueDto;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  severity: BasePropertyIssueDto;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  reproducibility: BasePropertyIssueDto;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  status: BasePropertyIssueDto;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  viewState: BasePropertyIssueDto;

  @Expose()
  summary: string;

  @Expose()
  @Transform(({ value }) => !!value)
  sticky: boolean;

  @Expose()
  @Type(() => Category)
  category: Category;

  @Expose()
  @Type(() => Project)
  project: Project;

  @Expose()
  @Transform(({ value }: { value: HandlerUser }) => {
    return {
      id: value?.id ? value.id : null,
      name: value?.name ? value.name : null,
      email: value?.email ? value.email : null,
      title: value?.name ? 'ST' : '',
      dept: value?.name ? '今網智慧' : '',
    };
  })
  @Type(() => HandlerUser)
  handler?: HandlerUser;

  // Path: src/modules/mantisbt/bugs/entity/mantisbt-bug.entity.ts
  // mantisbtBugCountKeys.notesCount
  @Expose()
  @Type(() => User)
  notesCount?: number;

  @Expose()
  @Type(() => Date)
  @Transform(({ obj }) =>
    obj.dateSubmitted ? new Date(obj.dateSubmitted) : null,
  )
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  @Transform(({ obj }) => (obj.lastUpdated ? new Date(obj.lastUpdated) : null))
  updatedAt: Date;

  @Expose()
  @Type(() => DataOfIssuesListDto)
  data: DataOfIssuesListDto;
}
