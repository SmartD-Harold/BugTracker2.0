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
  tags: any[];
  groups: any[];
};

export function TagsSerialize(dto: ClassConstructor = null) {
  return UseInterceptors(new TagsSerializeInterceptor(dto));
}
export class TagsSerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: DataType) => {
        const { title, tags, groups } = data;
        let _data = tags || [];
        const _secondData = groups || [];
        if (tags.length === 0) {
          return {
            title,
            records: {
              tags: _data,
              groups: _secondData || [],
            },
          };
        }

        if (this.dto) {
          _data = plainToInstance(this.dto, tags, {
            excludeExtraneousValues: true,
          });
        }

        return {
          title,
          records: {
            tags: _data,
            groups: _secondData || [],
          },
        };
      }),
    );
  }
}
