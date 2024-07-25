import { Expose, Transform, Type } from 'class-transformer';
import { MantisbtBugEntity } from '../../../mantisbt/bugs/entity/mantisbt-bug.entity';

class BasePropertyIssueDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  label: string;
}

class ProjectDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

class ProjectOfIssueItemDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  name: string;
}

class DataOfIssueItemDto {
  @Expose()
  id: number;

  @Expose()
  uuid: string;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  statueCode: BasePropertyIssueDto;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  subStatueCode: BasePropertyIssueDto;

  @Expose()
  @Type(() => ProjectOfIssueItemDto)
  project: ProjectOfIssueItemDto;
}

//        {
//             "id": 5,
//             "userId": 2,
//             "name": "收集中",
//             "description": "",
//             "dateCreated": 1710314509,
//             "dateUpdated": 1710314509,
//             "tagGroup": {
//                 "id": 1,
//                 "code": "ALL",
//                 "name": "全部"
//             }
//         }

class TagGroupDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  name: string;
}
class TagOfIssueItemDto {
  @Expose()
  id: number;

  // @Expose()
  // userId: string;

  @Expose()
  name: string;

  // @Expose()
  // description: string;

  @Expose()
  @Type(() => TagGroupDto)
  tagGroup: TagGroupDto;

  // @Expose()
  // @Transform(({ obj }) => (obj.dateCreated ? new Date(obj.dateCreated) : null))
  // createdAt: Date;
  //
  // @Expose()
  // @Transform(({ obj }) => (obj.dateUpdated ? new Date(obj.dateUpdated) : null))
  // updatedAt: Date;
}

export class RelationshipIssueItemDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  status: BasePropertyIssueDto;

  @Expose()
  @Type(() => ProjectDto)
  project: ProjectDto;

  @Expose()
  summary: string;

  @Expose()
  @Type(() => TagOfIssueItemDto)
  tags: TagOfIssueItemDto;

  @Expose()
  @Type(() => Date)
  @Transform(({ obj }) =>
    obj.dateSubmitted ? new Date(obj.dateSubmitted) : null,
  )
  createdAt: Date;

  @Expose()
  @Type(() => DataOfIssueItemDto)
  data: DataOfIssueItemDto;
}
