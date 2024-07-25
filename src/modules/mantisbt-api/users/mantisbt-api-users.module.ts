import { Module } from '@nestjs/common';
import { MantisbtApiUsersService } from './mantisbt-api-users.service';
import { MantisbtApiUsersRepository } from './mantisbt-api-users.repository';
import { MantisbtApiUsersController } from './mantisbt-api-users.controller';

@Module({
  providers: [MantisbtApiUsersService, MantisbtApiUsersRepository],
  controllers: [MantisbtApiUsersController],
  exports: [MantisbtApiUsersService],
})
export class MantisbtApiUsersModule {}
