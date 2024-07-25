import { AxiosInstance } from 'axios';
import apiMantisbt from 'src/utils/axios/mantisbt-api.axios';
import { HttpException } from '@nestjs/common';
import { BugtrackerUserEntity } from '../../modules/bugtracker/users/entity/bugtracker-user.entity';
import { ClsService } from 'nestjs-cls';

export class AxiosRepository {
  protected readonly axiosInstance: AxiosInstance;
  protected readonly axiosConfig = {};
  protected apiTargetUrl: string = '';

  constructor(
    url: string,
    protected readonly cls: ClsService,
  ) {
    this.axiosInstance = apiMantisbt;
    // this.axiosInstance.defaults.headers.common['Authorization'] = '';
    this.axiosInstance.defaults.headers.common['Content-Type'] =
      'application/json';
    this.apiTargetUrl = url;
  }

  settingCurrentUser() {
    const user = this.cls.get('user');
    return this.setUser(user);
  }

  setUser(
    user:
      | {
          mantisbtApiTokenCode: string;
        }
      | BugtrackerUserEntity,
  ) {
    // console.log('🎯AxiosRepository:setUser', user);
    this.setConfig({ token: user.mantisbtApiTokenCode });
    return this;
  }

  setConfig({ token }: { token?: string } = {}) {
    if (token) {
      this.axiosInstance.defaults.headers.common['Authorization'] = token;
    }
    return this;
  }

  getFullUrl() {
    return `${this.axiosInstance.defaults.baseURL}${this.apiTargetUrl}`;
  }

  protected throwHttpException({ response }) {
    const { status, statusText, data } = response;
    throw new HttpException(
      {
        status: status,
        error: statusText,
        data,
      },
      status,
    );
  }
}
