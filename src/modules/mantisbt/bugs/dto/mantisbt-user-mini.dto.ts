import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MantisbtUserMiniDto {
  @Expose()
  id: number;

  @Expose({ name: 'name' })
  userName: string;

  @Expose()
  realName: string;

  @Expose()
  email: string;
}
