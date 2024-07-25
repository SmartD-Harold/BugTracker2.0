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
  maninData: { [key: string]: any } | [];
};

export function CommonsSerialize(dto: ClassConstructor = null) {
  return UseInterceptors(new CommonsSerializeInterceptor(dto));
}
export class CommonsSerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: DataType) => {
        const { title, maninData } = data;
        let _data = maninData || {};
        if (Object.keys(_data).length === 0) {
          return {
            title,
            data: _data,
          };
        }

        if (this.dto) {
          _data = plainToInstance(this.dto, maninData, {
            excludeExtraneousValues: true,
          });
          // _data = plainToInstance(this.dto, maninData);
        }

        const _size = Array.isArray(_data)
          ? _data.length
          : Object.entries(_data).reduce((acc, [key, value]) => {
              if (value === undefined) return acc;
              return { ...acc, [key]: value?.length ?? 0 };
            }, {});

        return {
          title,
          size: _size,
          data: _data,
        };
      }),
    );
  }
}
