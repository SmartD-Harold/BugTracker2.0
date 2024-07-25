import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MantisbtApiUsersService } from './mantisbt-api-users.service';
import { CreateMantisbtApiUserDto } from './dto/create-mantisbt-api-user.dto';

// RouterModule: mantisbt/api/users
@Controller()
export class MantisbtApiUsersController {
  constructor(private readonly mantisbtUsersService: MantisbtApiUsersService) {}

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.mantisbtUsersService.getUser(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateMantisbtApiUserDto) {
    const user = await this.mantisbtUsersService.createUser(createUserDto);
    const token = await this.mantisbtUsersService.createTokenByUser(user.id);
    console.log('token');
    console.log(token);
    return {
      ...user,
      apiToken: token,
    };
  }
}
