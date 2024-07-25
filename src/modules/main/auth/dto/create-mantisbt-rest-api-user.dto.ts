import { MantisbtUserAccessLevel } from 'src/modules/mantisbt-api/users/types/mantisbt-api-users.enum';

export class CreateMantisbtApiUserDto {
  public readonly username: string;
  public readonly password: string;
  public readonly realName: string;
  public readonly email: string;
  public readonly accessLevel?: {
    name: MantisbtUserAccessLevel;
    id?: number;
    label?: string;
  };
  public readonly enabled?: boolean;
  public readonly protected?: boolean;
}
