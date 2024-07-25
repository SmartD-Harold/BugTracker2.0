import { Expose, Transform, Type } from 'class-transformer';
import { Allow } from 'class-validator';
import { stringToArray } from 'src/utils/self';
class BasicPropertyType {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  @Type(() => String)
  name: string;

  @Expose()
  @Type(() => String)
  label: string;
}

class Category {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  @Type(() => String)
  name: string;
}

class Project {
  @Expose()
  @Type(() => Number)
  id: number;

  @Expose()
  @Type(() => String)
  name: string;

  @Expose()
  @Type(() => Boolean)
  @Transform(({ value }) => !!value)
  enabled: boolean;

  @Expose()
  @Type(() => Category)
  category: Category;
}

export class SettingsIssuesDto {
  @Expose()
  @Type(() => Project)
  projects: Project[];

  @Expose()
  @Type(() => Category)
  categories: Category[];

  @Expose()
  @Type(() => BasicPropertyType)
  statuses: BasicPropertyType[];

  @Expose()
  @Type(() => BasicPropertyType)
  priorities: BasicPropertyType[];

  @Expose()
  @Type(() => BasicPropertyType)
  severities: BasicPropertyType[];

  @Expose()
  @Type(() => BasicPropertyType)
  reproducibility: BasicPropertyType[];
}

export class GetSettingsIssuesWhitelistDto {
  @Expose()
  @Type(() => String)
  @Transform(({ value = [] }) => stringToArray(value))
  @Allow()
  whitelist: string[] = [];
}
