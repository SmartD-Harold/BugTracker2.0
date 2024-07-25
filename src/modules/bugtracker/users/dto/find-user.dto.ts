import { IsEmail, IsInt, IsString, IsUUID, IsOptional } from 'class-validator';
export class FindUserDto {
  @IsOptional()
  @IsEmail()
  public readonly email?: string;

  @IsOptional()
  @IsInt()
  public readonly id?: number;

  @IsOptional()
  @IsString()
  public readonly thirdPartyId?: string;

  @IsOptional()
  @IsUUID('4')
  public readonly thirdPartyUserId?: string;
}
