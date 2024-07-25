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
  page: number;
  size: number;
};

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
function serializeMetadata(size: number, page: number, data: any[] = []) {
  return {
    start: size * page - size,
    size,
    page,
    count: data.length ?? 0,
  };
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: DataType) => {
        const { title, maninData, secondData, size, page } = data;
        console.log('data');
        console.log(data);
        const metadata = serializeMetadata(size, page, maninData);
        if (maninData.length === 0) {
          return {
            title,
            metadata,
            records: [],
          };
        }

        if (secondData.size > 0) {
          maninData.forEach((issue: any) => {
            issue.data = secondData.get(issue.id) || {};
          });
        }
        const _data = plainToInstance(this.dto, maninData, {
          excludeExtraneousValues: true,
        });

        return {
          title,
          metadata,
          records: _data,
        };
      }),
    );
  }
}
