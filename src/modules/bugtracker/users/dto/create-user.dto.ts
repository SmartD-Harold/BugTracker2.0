export class CreateUserDto {
  public readonly account: string;
  public readonly userName: string;
  public readonly supertokensThirdPartyId: string;
  public readonly supertokensThirdPartyUserId: string;
  public readonly mantisbtUserId?: number;
  public readonly mantisbtUserPassword?: string;
  public readonly mantisbtApiTokenId?: number;
  public readonly mantisbtApiTokenCode?: string;
}
