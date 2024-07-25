import { Expose, Transform, Type } from 'class-transformer';

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

class MiniIssuesDataDto {
  @Expose()
  id: number;

  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  serviceTargetType: string;

  @Expose()
  statueCode: string;

  @Expose()
  statueName: string;

  @Expose()
  subStatueCode: string;

  @Expose()
  subStatueName: string;

  @Expose()
  handlerType: string;

  @Expose()
  handlerId: number;

  @Expose()
  handlerUserId: number;

  @Expose()
  @Type(() => AzureTasksDto)
  azureTasks: AzureTasksDto;

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
}

export class MiniIssuesDto {
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
  @Type(() => Date)
  @Transform(({ obj }) => new Date(obj.dateSubmitted))
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  @Transform(({ obj }) => new Date(obj.lastUpdated))
  updatedAt: Date;

  @Expose()
  @Type(() => MiniIssuesDataDto)
  data: MiniIssuesDataDto;
}
