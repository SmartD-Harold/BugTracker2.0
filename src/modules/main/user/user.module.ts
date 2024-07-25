import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BugtrackerUserModule } from '../../bugtracker/users/bugtracker-user.module';

@Module({
  imports: [BugtrackerUserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
