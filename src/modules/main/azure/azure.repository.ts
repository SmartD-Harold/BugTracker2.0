import { HttpException, Injectable } from '@nestjs/common';
import { AzureAxiosRepository } from '../../../utils/axios/azure-axios.repository';
import { ClsService } from 'nestjs-cls';
import { ConfigService } from '@nestjs/config';
import { ConfigurationKey } from '../../../../config/configuration.config';

type AzureInfoType = {
  PAT: string;
  organization: string;
  project: string;
};
@Injectable()
export class AzureRepository extends AzureAxiosRepository {
  protected azureInfo: AzureInfoType;
  constructor(
    protected readonly cls: ClsService,
    protected readonly configService: ConfigService,
  ) {
    const _azureInfo: AzureInfoType = {
      PAT: configService.get(ConfigurationKey.azure.pat),
      organization: configService.get(ConfigurationKey.azure.organization),
      project: configService.get(ConfigurationKey.azure.project),
    };
    const api = configService.get(ConfigurationKey.azure.api);
    super(api, cls, _azureInfo);
    this.azureInfo = _azureInfo;
  }

  async fetchWorkItemById({
    id,
    org = null,
    project = null,
  }: {
    id: number;
    org?: string | null;
    project?: string | null;
  }) {
    this.setURL({ org, project });
    const path = `/wit/workitems/${id}?api-version=7.1-preview.3`;
    const workItem = await this.axiosInstance
      .get(path, this.axiosConfig)
      .then(({ data }) => data)
      .catch(({ response } = {}) => {
        console.log('🎯fetchWorkItemById:catch', {
          status: response?.status,
          error: response?.statusText,
          data: response?.statusText || 'azure api error',
        });
        throw new HttpException(
          {
            status: response?.status,
            error: response?.statusText,
            data: response?.statusText || 'azure api error',
          },
          response?.status,
        );
      });
    return {
      req: {
        org: org || this.azureInfo.organization,
        project: project || this.azureInfo.project,
        url: `${this.axiosInstance.defaults.baseURL}${path}`,
        method: 'GET',
      },
      data: workItem,
    };
  }
}
