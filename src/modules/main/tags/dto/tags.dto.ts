import { Exclude, Expose, Transform, Type } from 'class-transformer';

class TagGroup {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  name: string;
}

export class TagsDto {
  // @Expose()
  // id: number;

  @Expose()
  @Transform(({ obj }) => obj.mantisbtTagId)
  id: number;

  // @Expose()
  // mantisbtTagId: number;

  @Expose()
  name: string;

  @Exclude()
  description: string;

  // @Expose()
  // @Transform(({ value }) => value || 0)
  // bugCount: number;

  @Expose()
  @Transform(({ obj }) => obj?.bugCount || 0)
  count: number;
  //
  // @Expose()
  // tagGroupId?: number;

  @Expose()
  @Type(() => TagGroup)
  @Transform(({ obj }) => obj.tagGroup || {})
  group?: TagGroup;
}

export class TagGroupsDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  count?: number;

  @Expose()
  lists?: number[];
}
