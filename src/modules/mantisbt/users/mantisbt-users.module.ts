import { Module } from '@nestjs/common';
import { MantisbtUsersController } from './mantisbt-users.controller';
import { MantisbtUsersService } from './mantisbt-users.service';
import { MantisbtUsersRepository } from './mantisbt-users.repository';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { MantisbtUserEntity } from './entity/mantisbt-user.entity';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import { MantisbtRestApiTokensModule } from '../tokens/mantisbt-rest-api-tokens.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([MantisbtUserEntity], MantisbtDatabaseConnection),
    MantisbtRestApiTokensModule,
  ],
  providers: [
    MantisbtUsersService,
    {
      provide: MantisbtUsersRepository,
      useFactory: (dataSource: DataSource) => {
        return new MantisbtUsersRepository(dataSource);
      },
      inject: [getDataSourceToken(MantisbtDatabaseConnection)],
    },
  ],
  controllers: [MantisbtUsersController],
  exports: [MantisbtUsersService],
})
export class MantisbtUsersModule {}
