import { Expose, Transform, Type } from 'class-transformer';
import { formatBytes } from 'src/utils/self';
import {
  DbAzureWorkItemType,
  DbAzureWorkItemZod,
} from '../../azure/zod/db-azure-work-item.zod';
import { BugtrackerAzureWorkItemEntity } from '../../../bugtracker/issues/entity/bugtracker-azure-work-item.entity';
import { ConfigurationConfig } from '../../../../../config/configuration.config';

const config = ConfigurationConfig();

class BasePropertyIssueDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  label: string;
}

class CategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

class TagGroupsDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  name: string;
}

class TagsDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => TagGroupsDto)
  tagGroup?: TagGroupsDto;
}

export class AttachFilesDto {
  @Expose()
  id: string;

  @Expose()
  nanoid: string;

  @Expose()
  contentType: string;

  @Expose()
  originalName: string;

  // @Expose()
  // name: string;

  // @Expose()
  // filename: string;

  // bytes
  // filesize: number;

  // @Expose()
  // path: string;

  // @Expose()
  // userId: number;

  @Expose()
  bugNoteId: number;

  @Expose()
  @Type(() => Date)
  @Transform(({ obj }) => {
    // return obj.createdAt ? twDayjs(obj.createdAt) : null;
    return obj.createdAt ? new Date(obj.createdAt) : null;
  })
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => formatBytes(obj.filesize, 0))
  size: string;

  @Expose()
  @Transform(
    ({ obj }) =>
      `${config.google.storage.publicUrl}/${config.google.storage}/${obj.destination}/${obj.filename}`,
  )
  url: string;
}

class BasicProjectDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

class ProjectDto extends BasicProjectDto {
  @Expose()
  @Transform(({ value }) => !!value)
  enabled?: boolean;

  // @Expose()
  // @Type(() => BasePropertyIssueDto)
  // viewState: BasePropertyIssueDto;
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
  @Transform(({ value }) => !!value)
  isClosed: boolean;
}

class CompanyDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  city: string;

  @Expose()
  dist?: string;

  @Expose()
  @Transform(({ value }) => !!value)
  enabled?: boolean;
}

class ApartmentComplexDto extends CompanyDto {}
class ConstructionCompanyDto extends ApartmentComplexDto {}
class EstateManagementCompany extends ApartmentComplexDto {}

class projectFunctionMiniDto {
  @Expose()
  id: number;

  @Expose()
  uuid: string;

  @Expose()
  name: string;

  // @Expose()
  // projectId: number;

  // @Expose()
  // code: string;

  // @Expose()
  // @Transform(({ value }) => !!value)
  // enabled?: boolean;
}

class categoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

class IssuesNoteUserEmployeeDto {
  @Expose()
  employeeId: string;

  @Expose()
  name: string;

  @Expose()
  isCompanyEmail: boolean;

  @Expose()
  department: string;
}

class IssuesNoteReporterDto {
  @Expose()
  id: number;

  @Expose()
  account: string;

  @Expose()
  @Transform(({ obj }) => obj.account)
  email: string;

  @Expose()
  userName: string;

  @Expose()
  mantisbtUserId: number;

  @Expose()
  enabled: boolean;

  @Expose()
  @Type(() => IssuesNoteUserEmployeeDto)
  employee: IssuesNoteUserEmployeeDto;
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

class HandlerUserDto extends UserDto {
  @Expose()
  title: string;

  @Expose()
  dept: string;
}

class ReporterUserDto extends UserDto {
  @Expose()
  title: string;

  @Expose()
  dept: string;
}

class EmployeeDto {
  // @Expose()
  // id: number;
  //
  // @Expose()
  // code: number;

  @Expose()
  employeeId: string;

  @Expose()
  name: string;

  // @Expose()
  // email: string;

  // @Expose()
  // isCompanyEmail: boolean;

  @Expose()
  department: string;
}
class SubUserDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) => (obj.userName ? obj.userName : ''))
  name: string;

  @Expose()
  @Transform(({ obj }) => (obj.account ? obj.account : ''))
  email: string;

  @Expose()
  mantisbtUserId: string;

  @Expose()
  @Type(() => EmployeeDto)
  employee: EmployeeDto;
}

class SubRoleDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }) => obj.users.length ?? 0)
  userCount: number;

  @Expose()
  @Type(() => SubUserDto)
  users: SubUserDto[];
}

class BugTextDto {
  @Expose()
  id: string;

  // @Expose()
  // description: string;

  @Expose()
  @Transform(({ obj }) => (obj.description ? obj.description : ''))
  desc: string;

  @Expose()
  stepsToReproduce: string;

  @Expose()
  additionalInformation: string;
}

export class NoteDto {
  @Expose()
  id: number;

  @Expose()
  bugId: number;

  @Expose()
  bugnoteTextId: number;

  @Expose()
  noteType: number;

  @Expose()
  noteAttr: number;

  // @Expose()
  // @Type(() => NoteTextDto)
  // noteText: NoteTextDto;

  @Expose()
  @Transform(({ obj }) => (obj.noteText?.id ? obj.noteText.id : ''))
  noteTextId: number;

  @Expose()
  @Transform(({ obj }) => (obj.noteText?.note ? obj.noteText.note : ''))
  noteTextNote: string;

  @Expose()
  @Type(() => IssuesNoteReporterDto)
  reporter?: IssuesNoteReporterDto;

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
}

class RelationDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  status: BasePropertyIssueDto;

  @Expose()
  sourceBugId: number;

  @Expose()
  @Transform(({ value }) => !!value)
  isSource: boolean;

  @Expose()
  relationshipTypeId: number;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  relationshipType: BasePropertyIssueDto;

  @Expose()
  relationId: number;

  @Expose()
  title: string;

  @Expose()
  @Type(() => BasicProjectDto)
  project: BasicProjectDto;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  // @Expose()
  // @Type(() => Date)
  // @Transform(({ obj }) => (obj.createdAt ? new Date(obj.createdAt) : null))
  // createdAt: Date;
  //
  // @Expose()
  // @Type(() => Date)
  // @Transform(({ obj }) => (obj.updatedAt ? new Date(obj.updatedAt) : null))
  // updatedAt: Date;
}

class ProjectOfIssueItemDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  name: string;

  // @Expose()
  // mantisbtProjectId: number;

  @Expose()
  handlerRoleId: number;

  @Expose()
  platform: string;

  @Expose()
  product: string;

  @Expose()
  service: string;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  serviceTargetType: BasePropertyIssueDto;

  // @Expose()
  // order: number;

  // @Expose()
  // @Type(() => Date)
  // @Transform(({ obj }) => (obj.deletedAt ? new Date(obj.deletedAt) : null))
  // deletedAt: Date;
}

class DataOfIssueItemDto {
  @Expose()
  id: number;

  @Expose()
  uuid: string;

  @Expose()
  name: string;

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
  @Type(() => SubUserDto)
  handlerUser: SubUserDto;

  @Expose()
  reporterUserId: number;

  @Expose()
  @Type(() => SubUserDto)
  reporterUser: SubUserDto;

  @Expose()
  handlerRoleId: number;

  @Expose()
  @Type(() => SubRoleDto)
  handlerRole: SubRoleDto;

  @Expose()
  handlerDeptId: number;

  @Expose()
  @Type(() => AzureTasksDto)
  azureTasks: AzureTasksDto;

  @Expose()
  @Type(() => ApartmentComplexDto)
  apartmentComplex?: ApartmentComplexDto;

  @Expose()
  @Type(() => ConstructionCompanyDto)
  constructionCompany?: ConstructionCompanyDto;

  @Expose()
  @Type(() => EstateManagementCompany)
  estateManagementCompany?: EstateManagementCompany;

  @Expose()
  @Type(() => projectFunctionMiniDto)
  projectFunction: projectFunctionMiniDto;

  @Expose()
  @Type(() => ProjectOfIssueItemDto)
  project: ProjectOfIssueItemDto;

  @Expose()
  @Type(() => categoryDto)
  category: categoryDto;

  @Expose()
  version: string;

  @Expose()
  targetVersion: string;

  @Expose()
  deviceName: string;

  @Expose()
  deviceNote: string;

  @Expose()
  @Type(() => Date)
  @Transform(({ obj }) => (obj.expiresAt ? new Date(obj.expiresAt) : null))
  expiresAt: Date;

  @Expose()
  @Type(() => Date)
  @Transform(({ obj }) => (obj.archiveAt ? new Date(obj.archiveAt) : null))
  archiveAt: Date;

  @Expose()
  @Type(() => AttachFilesDto)
  attachFiles: AttachFilesDto[];

  @Expose()
  @Transform(({ value }) => {
    return value.map((azureWorkItem: BugtrackerAzureWorkItemEntity) => {
      return DbAzureWorkItemZod.parse(azureWorkItem);
    });
  })
  azureWorkItems: DbAzureWorkItemType[];

  // @Expose()
  // @Type(() => Date)
  // @Transform(({ obj }) => (obj.deletedAt ? new Date(obj.deletedAt) : null))
  // deletedAt: Date;
}

export class IssueItemDto {
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
  @Type(() => BasePropertyIssueDto)
  resolution: BasePropertyIssueDto;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  projection: BasePropertyIssueDto;

  @Expose()
  os: string;

  @Expose()
  osBuild: string;

  @Expose()
  platform: string;

  @Expose()
  build: string;

  @Expose()
  summary: string;

  @Expose()
  @Transform(({ value }) => !!value)
  sticky: boolean;

  @Expose()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @Expose()
  @Type(() => TagsDto)
  tags: TagsDto[];

  @Expose()
  @Type(() => ProjectDto)
  project: ProjectDto;

  @Expose()
  @Transform(({ value }: { value: HandlerUserDto }) => {
    return {
      id: value?.id ? value.id : null,
      name: value?.name ? value.name : null,
      email: value?.email ? value.email : null,
      title: value?.name ? 'ST' : '',
      dept: value?.name ? '今網智慧' : '',
    };
  })
  @Type(() => HandlerUserDto)
  handler?: HandlerUserDto;

  @Expose()
  @Type(() => ReporterUserDto)
  reporter?: ReporterUserDto;

  @Expose()
  @Type(() => BugTextDto)
  bugText: BugTextDto;

  @Expose()
  @Type(() => NoteDto)
  notes: NoteDto[];

  @Expose()
  @Type(() => RelationDto)
  relations: RelationDto[];

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
  @Type(() => DataOfIssueItemDto)
  data: DataOfIssueItemDto;
}
