import { Injectable } from '@nestjs/common';
import { CreateMantisbtApiUserDto } from './dto/create-mantisbt-rest-api-user.dto';
import { ClsService } from 'nestjs-cls';
import { MantisbtApiUsersRepository } from '../../mantisbt-api/users/mantisbt-api-users.repository';
import { ConfigService } from '@nestjs/config';
import { ConfigurationKey } from '../../../../config/configuration.config';

export type MantisbtUser = {
  id: number;
  name: string;
  realName: string;
  email: string;
  language: string;
  timezone: string;
  accessLevel: {
    id: number;
    name: string;
    label: string;
  };
  projects: {
    id: number;
    name: string;
  }[];
};

type MantisbtUserToken = {
  id: number;
  name: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export interface ApiUsersRepository {
  getUserById(id: number): Promise<MantisbtUser>;
  createUser(createUserDto: CreateMantisbtApiUserDto): Promise<MantisbtUser>;
  createTokenByUserId(userId: number): Promise<MantisbtUserToken>;
}

@Injectable()
export class AdminMantisbtApiUsersRepository
  extends MantisbtApiUsersRepository
  implements ApiUsersRepository
{
  private apiToken: string;
  constructor(
    public configService: ConfigService,
    protected readonly cls: ClsService,
  ) {
    super(cls);
    this.apiToken = this.configService.get<string>(
      ConfigurationKey.mantisbt.api.token,
    );
    this.setConfig({
      token: this.apiToken,
    });
  }
  async getUserById(id: number): Promise<MantisbtUser> {
    return await super.getUserById(id);
  }

  async createUser(
    createUserDto: CreateMantisbtApiUserDto,
  ): Promise<MantisbtUser> {
    return await super.createUser(createUserDto);
  }

  async createTokenByUserId(userId: number): Promise<MantisbtUserToken> {
    return await super.createTokenByUserId(userId);
  }
}
