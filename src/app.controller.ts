import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from './modules/main/auth/guards/auth.guard';
import { Session } from './modules/main/auth/decorators/session.decorator';
import { CurrentUserInterceptor } from './modules/main/auth/interceptors/current-user.interceptor';
import { CurrentUser } from './modules/main/auth/decorators/current-user.decorator';

@Controller()
export class AppController {
  constructor() {}
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('test')
  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  async getTest(
    @CurrentUser() user: any,
    @Session() session: SessionContainer,
  ): Promise<string> {
    // TODO: magic
    console.log('🎯getTest');
    console.log('🎯user');
    console.log(user);
    // console.log('🎯session');
    // console.log(session);
    return 'magic';
  }
}
