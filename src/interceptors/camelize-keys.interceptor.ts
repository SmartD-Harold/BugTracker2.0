import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { camelizeKeys } from 'humps';
import { Observable } from 'rxjs';
@Injectable()
export class CamelizeKeysInterceptor implements NestInterceptor {
  constructor() {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    // console.log('🎯CamelizeKeysInterceptor');
    const request = context.switchToHttp().getRequest();
    // Query
    if (Object.keys(request.query).length > 0) {
      request.query = camelizeKeys(request.query);
    }
    // Body
    if (Object.keys(request.body).length > 0) {
      request.query = camelizeKeys(request.body);
    }
    // Params
    if (Object.keys(request.params).length > 0) {
      request.query = camelizeKeys(request.params);
    }

    return next.handle();
  }
}
