import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUserInterceptor } from '../auth/interceptors/current-user.interceptor';

type HandlerType = 'USER' | 'ROLE' | 'DEPT';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Get('handler/:type')
  async handlerData(@Param('type') type: HandlerType) {
    const _data = await this.userService.handlerData(type);

    return {
      title: 'handler data',
      type: type,
      data: _data,
    };
  }
}
