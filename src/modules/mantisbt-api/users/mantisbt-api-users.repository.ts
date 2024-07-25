import { HttpException, Injectable } from '@nestjs/common';
import { CreateMantisbtApiUserDto } from './dto/create-mantisbt-api-user.dto';
import { ResponseType } from 'src/utils/axios/types/mantisbt.axios.interface';
import { AxiosRepository } from '../../../utils/axios/axios.repository';
import { ClsService } from 'nestjs-cls';
import { ApiUsersRepository } from '../../main/auth/admin-mantisbt-api-users.repository';

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

@Injectable()
export class MantisbtApiUsersRepository
  extends AxiosRepository
  implements ApiUsersRepository
{
  constructor(protected readonly cls: ClsService) {
    super('/users', cls);
  }
  async getUserById(id: number): Promise<MantisbtUser> {
    console.log(`${this.apiTargetUrl}/${id}`);
    const user = await this.axiosInstance
      .get(`${this.apiTargetUrl}/${id}`)
      .then(
        ({ data }: ResponseType<{ users: [MantisbtUser?] }>) => data.users[0],
      )
      .catch(({ response }) => {
        const { status, statusText, data } = response;
        throw new HttpException(
          {
            status: status,
            error: statusText,
            data,
          },
          status,
        );
      });
    return user;
  }

  async createUser(
    createUserDto: CreateMantisbtApiUserDto,
  ): Promise<MantisbtUser> {
    console.log('MantisbtUsersRepository:createUser');
    const payloadData = JSON.stringify(createUserDto);
    const user = await this.axiosInstance
      .post(`${this.apiTargetUrl}`, payloadData)
      .then(({ data }: ResponseType<{ user: MantisbtUser }>) => data.user)
      .catch(({ response }) => {
        const { status, statusText, data } = response;
        throw new HttpException(
          {
            status: status,
            error: statusText,
            data,
          },
          status,
        );
      });
    return user;
  }

  async deleteUserById(id: number): Promise<void> {
    console.log(`${this.apiTargetUrl}/${id}`);
    await this.axiosInstance
      .delete(`${this.apiTargetUrl}/${id}`)
      .then(({ data }: any) => data)
      .catch(({ response }) => {
        const { status, statusText, data } = response;
        throw new HttpException(
          {
            status: status,
            error: statusText,
            data,
          },
          status,
        );
      });
  }

  async createTokenByUserId(userId: number): Promise<MantisbtUserToken> {
    const tokenInfo = await this.axiosInstance
      .post(`${this.apiTargetUrl}/${userId}/token`, {})
      .then(({ data }: ResponseType<MantisbtUserToken>) => data)
      .catch(({ response }) => {
        const { status, statusText, data } = response;
        throw new HttpException(
          {
            status: status,
            error: statusText,
            data,
          },
          status,
        );
      });
    console.log('MantisbtUsersRepository:createTokenByUserId');
    console.log(tokenInfo);
    return tokenInfo;
  }

  async deleteAPITokenByUserId(id: number, userId: number): Promise<void> {
    await this.axiosInstance
      .delete(`${this.apiTargetUrl}/${userId}/token/${id}`)
      .then(({ data }: any) => data)
      .catch(({ response }) => {
        const { status, statusText, data } = response;
        throw new HttpException(
          {
            status: status,
            error: statusText,
            data,
          },
          status,
        );
      });
  }
}
