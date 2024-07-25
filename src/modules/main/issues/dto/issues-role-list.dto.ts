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

class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  // @Expose()
  realName: string;

  @Expose()
  email: string;
}

// class HandlerUser extends User {
//   @Expose()
//   title: string;
//
//   @Expose()
//   dept: string;
// }

class HandlerRoleDto {
  @Expose()
  id: string;

  @Expose()
  code: string;

  @Expose()
  name: string;
}

class DataOfIssuesRoleListDto {
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

  @Expose()
  @Type(() => HandlerRoleDto)
  handlerRole: HandlerRoleDto;
}

export class IssuesRoleListDto {
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
  @Transform(({ obj }) => {
    const _handlerRole = obj.data?.handlerRole;
    return {
      id: _handlerRole?.id ? _handlerRole?.id : null,
      name: _handlerRole?.name ? _handlerRole?.name : null,
      email: _handlerRole?.code ? _handlerRole?.code : null,
      title: _handlerRole?.name ? 'RO' : '',
      dept: _handlerRole?.name ? '角色' : '',
    };
  })
  @Type(() => HandlerRoleDto)
  handler?: HandlerRoleDto;

  @Expose()
  @Transform(({ obj }) => obj.notes?.length || 0)
  noteCount: number;

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
  @Type(() => DataOfIssuesRoleListDto)
  data: DataOfIssuesRoleListDto;
}
