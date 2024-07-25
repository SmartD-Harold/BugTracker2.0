import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import {
  BUG_TRACKER_TOKEN,
  MantisbtRestApiTokenEntity,
} from '../../mantisbt/tokens/entity/mantisbt-rest-api-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminMantisbtApiTokensService {
  constructor(
    @InjectRepository(MantisbtRestApiTokenEntity, MantisbtDatabaseConnection)
    protected readonly mantisbtRestApiTokensRepository: Repository<MantisbtRestApiTokenEntity>,
  ) {}

  async updateTokenById(id: number) {
    const tokenEntity = await this.mantisbtRestApiTokensRepository.findOne({
      where: {
        id,
      },
    });
    tokenEntity.name = [BUG_TRACKER_TOKEN, tokenEntity.name].join(',');
    await this.mantisbtRestApiTokensRepository.save(tokenEntity);
    return tokenEntity;
  }
}
