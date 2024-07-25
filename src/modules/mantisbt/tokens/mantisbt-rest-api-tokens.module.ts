import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import { MantisbtRestApiTokenEntity } from './entity/mantisbt-rest-api-token.entity';
import { MantisbtRestApiTokensRepository } from './mantisbt-rest-api-tokens.repository';
import { MantisbtRestApiTokensService } from './mantisbt-rest-api-tokens.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [MantisbtRestApiTokenEntity],
      MantisbtDatabaseConnection,
    ),
  ],
  providers: [
    MantisbtRestApiTokensService,
    {
      provide: MantisbtRestApiTokensRepository,
      useFactory: (dataSource: DataSource) => {
        return new MantisbtRestApiTokensRepository(dataSource);
      },
      inject: [getDataSourceToken(MantisbtDatabaseConnection)],
    },
  ],
  exports: [MantisbtRestApiTokensService],
})
export class MantisbtRestApiTokensModule {}
