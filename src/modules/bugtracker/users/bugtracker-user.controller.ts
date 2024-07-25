import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BugtrackerUserService } from './bugtracker-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { ThirdParty } from '../../main/auth/types/supertokens.constants';

@Controller('bugtracker/users')
export class BugtrackerUserController {
  constructor(private readonly bugtrackerUserService: BugtrackerUserService) {}

  @Get()
  async getUsers() {
    return this.bugtrackerUserService.findUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':email')
  async getUserByEmail(@Param() findUserDto: FindUserDto) {
    const { email } = findUserDto;
    return this.bugtrackerUserService.findOneUserBy({ email });
  }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.bugtrackerUserService.createUserAndApiToken(createUserDto);
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  }

  @Delete(':email')
  async deleteUserByEmail(
    @Param() findUserDto: FindUserDto,
    @Body('thirdPartyId') thirdPartyId: string,
  ) {
    const { email } = findUserDto;
    return await this.bugtrackerUserService.deleteUserByEmail({
      thirdPartyId: thirdPartyId || ThirdParty.SmartDaily,
      email,
    });
  }
}
