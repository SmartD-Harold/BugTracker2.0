import { Expose, Transform, Type } from 'class-transformer';

export class SettingsUserDto {
  @Expose()
  @Type(() => Number)
  @Transform(({ obj }) => obj.userId)
  id: number;

  @Expose()
  @Transform(({ obj }) => obj.mantisbtUserId)
  mantisbtUserId: string;

  @Expose()
  @Type(() => String)
  // @Transform(({ obj }) => obj.email.split('@')[0])
  name: string;

  @Expose()
  @Type(() => String)
  email: string;

  @Expose()
  @Type(() => String)
  @Transform(({ obj }) => obj.name)
  label: string;
}
