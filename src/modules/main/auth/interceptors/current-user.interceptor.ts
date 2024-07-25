import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClsService } from 'nestjs-cls';
import { AuthService } from '../auth.service';
import { CLS_Keys } from 'src/utils/cls/cls.enum';
import { BugtrackerUserWithProjects } from '../../../bugtracker/users/interfaces/bugtracker-user.dto';
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private readonly cls: ClsService,
    private readonly authService: AuthService,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    // console.log('🎯CurrentUserInterceptor');
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;
    // console.log(' request.query', request.query);
    // console.log(' request.body', request.body);
    // console.log('🎯CurrentUserInterceptor:userId');
    // console.log(userId);
    if (userId) {
      const user = (await this.authService.findOneUserBy({
        thirdPartyUserId: userId,
      })) as BugtrackerUserWithProjects;
      if (user) {
        user.hasProjects = await this.authService.findProjectsByUserId(
          user.mantisbtUserId,
        );
        request.currentUser = user;
        this.cls.set(CLS_Keys.user, user);
      }
      // console.log('🎯CurrentUserInterceptor:user');
      // console.log(user);
    }

    return next.handle();
  }
}
