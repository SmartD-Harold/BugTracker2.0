import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): any;
}

type DataType = {
  title: string;
  maninData: any[];
  secondData: Map<number, any>;
};

export function IssuesSerialize(dto: ClassConstructor = null) {
  return UseInterceptors(new IssuesSerializeInterceptor(dto));
}
export class IssuesSerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: DataType) => {
        const { title, maninData, secondData } = data;
        let _data = maninData || [];
        console.log('data');
        console.log(data);
        if (maninData.length === 0) {
          return {
            title,
            records: _data,
          };
        }

        if (secondData.size > 0) {
          maninData.forEach((issue: any) => {
            issue.data = secondData.get(issue.id) || {};
          });
        }

        if (this.dto) {
          _data = plainToInstance(this.dto, maninData, {
            excludeExtraneousValues: true,
          });
        }

        return {
          title,
          records: _data,
        };
      }),
    );
  }
}
