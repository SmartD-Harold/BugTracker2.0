import { Expose, Transform, Type } from 'class-transformer';
// import { accessLevelTypeEnum } from '../../../mantisbt/projects/interfaces';
import { ViewStatueKeyEnum } from '../../../mantisbt/bugs/interfaces';

class BasePropertyIssueDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  label: string;
}

// class ProjectUser {
//   @Expose()
//   userId: number;
//
//   @Expose()
//   @Transform(({ value }) => accessLevelTypeEnum[value])
//   accessLevel?: BasePropertyIssueDto;
// }

class Category {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
export class MiniProjectsDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  // @Expose()
  // @Type(() => BasePropertyIssueDto)
  // status: BasePropertyIssueDto;

  @Expose()
  @Transform(({ value }) => !!value)
  enabled: boolean;

  @Expose()
  @Transform(({ obj }) => obj.viewState.id === ViewStatueKeyEnum.public_10)
  isPublic: boolean;

  @Expose()
  @Type(() => BasePropertyIssueDto)
  viewState: BasePropertyIssueDto;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ obj }) => {
    if (obj.id === 1) {
      return 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
    return null;
  })
  image: string = '';

  // @Expose()
  // categoryId: number;

  @Expose()
  @Type(() => Category)
  category: Category;

  // @Expose()
  // @Transform(({ value }) => !!value)
  // inheritGlobal: boolean;

  // @Expose()
  // @Type(() => ProjectUser)
  // projectUser?: ProjectUser;
}
