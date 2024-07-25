import { AxiosInstance } from 'axios';
import { HttpException } from '@nestjs/common';
import { BugtrackerUserEntity } from '../../modules/bugtracker/users/entity/bugtracker-user.entity';
import { ClsService } from 'nestjs-cls';
import apiAzure from './azure-api.axios';
export class AzureAxiosRepository {
  protected baseURL: string = '';
  protected readonly axiosInstance: AxiosInstance;
  protected readonly axiosConfig = {};
  protected apiTargetUrl: string = '';

  constructor(
    targetURL: string,
    protected readonly cls: ClsService,
    protected azureInfo: {
      PAT: string;
      organization: string;
      project: string;
    },
  ) {
    this.axiosInstance = apiAzure;
    this.axiosInstance.defaults.headers.common['Content-Type'] =
      'application/json';
    this.axiosInstance.defaults.auth = {
      username: '',
      password: azureInfo.PAT,
    };
    this.baseURL = targetURL || this.axiosInstance.defaults.baseURL;
    this.axiosInstance.defaults.baseURL = `${this.baseURL}/${azureInfo.organization}/${azureInfo.project}/_apis`;
    this.apiTargetUrl = targetURL;
  }

  settingCurrentUser() {
    const user = this.cls.get('user');
    return this.setUser(user);
  }

  setURL({
    org = null,
    project = null,
  }: {
    org?: string | null;
    project?: string | null;
  }) {
    org = org || this.azureInfo.organization;
    project = project || this.azureInfo.project;
    this.axiosInstance.defaults.baseURL = `${this.baseURL}/${org}/${project}/_apis`;
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
