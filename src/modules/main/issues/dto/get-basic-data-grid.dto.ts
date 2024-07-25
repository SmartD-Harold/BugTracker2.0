import { IsNumber, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { numberToArray } from 'src/utils/self';

const MAX_PAGE_SIZE_200 = 200;

export class GetBasicDataGridDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @Transform(
    (value) => (+value > MAX_PAGE_SIZE_200 ? MAX_PAGE_SIZE_200 : value),
    {
      toClassOnly: true,
    },
  )
  @IsNumber()
  size: number = 100;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value = [] }) => numberToArray(value), {
    toClassOnly: true,
  })
  @IsNumber({}, { each: true })
  project?: number[];

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value = [] }) => numberToArray(value), {
    toClassOnly: true,
  })
  @IsNumber({}, { each: true })
  status?: number[];

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value = [] }) => numberToArray(value), {
    toClassOnly: true,
  })
  @IsNumber({}, { each: true })
  handler?: number[];

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value = [] }) => numberToArray(value), {
    toClassOnly: true,
  })
  @IsNumber({}, { each: true })
  reporter?: number[];

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value = [] }) => numberToArray(value), {
    toClassOnly: true,
  })
  @IsNumber({}, { each: true })
  priority?: number[];

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value = [] }) => numberToArray(value), {
    toClassOnly: true,
  })
  @IsNumber({}, { each: true })
  severity?: number[];

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value = [] }) => numberToArray(value), {
    toClassOnly: true,
  })
  @IsNumber({}, { each: true })
  category?: number[];
}
