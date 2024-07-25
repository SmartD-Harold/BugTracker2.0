import { Injectable } from '@nestjs/common';
import { MantisbtRestApiTokensRepository } from './mantisbt-rest-api-tokens.repository';

@Injectable()
export class MantisbtRestApiTokensService {
  constructor(
    protected readonly mantisbtRestApiTokensRepository: MantisbtRestApiTokensRepository,
  ) {}

  async getTokenByUserId(userId: number) {
    return await this.mantisbtRestApiTokensRepository.getTokenByUserId(userId);
  }

  async updateTokenById(id: number) {
    return await this.mantisbtRestApiTokensRepository.updateTokenById(id);
  }
}
