import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  BUG_TRACKER_TOKEN,
  MantisbtRestApiTokenEntity,
} from './entity/mantisbt-rest-api-token.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';

@Injectable()
export class MantisbtRestApiTokensRepository extends Repository<MantisbtRestApiTokenEntity> {
  constructor(
    @InjectDataSource(MantisbtDatabaseConnection)
    protected dataSource: DataSource,
  ) {
    super(MantisbtRestApiTokenEntity, dataSource.createEntityManager());
  }

  async getTokenByUserId(userId: number): Promise<MantisbtRestApiTokenEntity> {
    return this.findOne({
      where: {
        userId,
      },
    });
  }

  async updateTokenById(id: number): Promise<MantisbtRestApiTokenEntity> {
    const tokenEntity = await this.findOne({
      where: {
        id,
      },
    });
    tokenEntity.name = [BUG_TRACKER_TOKEN, tokenEntity.name].join(',');
    await this.save(tokenEntity);
    return tokenEntity;
  }
}
