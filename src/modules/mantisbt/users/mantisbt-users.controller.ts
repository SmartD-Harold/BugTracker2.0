import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MantisbtUsersService } from './mantisbt-users.service';

@Controller('mantisbt/users')
export class MantisbtUsersController {
  constructor(private readonly mantisbtUsersService: MantisbtUsersService) {}

  @Get()
  async getUsers() {
    return this.mantisbtUsersService.findUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.mantisbtUsersService.findUserById(id);
  }
}
// nest g service modules/mantisbt/bugs --no-spec
