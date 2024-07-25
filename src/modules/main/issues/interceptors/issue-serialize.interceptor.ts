import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { MantisbtBugEntity } from '../../../mantisbt/bugs/entity/mantisbt-bug.entity';
import { BugtrackerIssueEntity } from '../../../bugtracker/issues/entity/bugtracker-issue.entity';

interface ClassConstructor {
  new (...args: any[]): any;
}

type DataType = {
  title: string;
  maninData: MantisbtBugEntity & {
    data?: BugtrackerIssueEntity;
  };
  secondData: BugtrackerIssueEntity;
};

export function IssueSerialize(dto: ClassConstructor = null) {
  return UseInterceptors(new IssueSerializeInterceptor(dto));
}
export class IssueSerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: DataType) => {
        const { maninData, secondData } = data;
        let _data = maninData || {};
        if (Object.keys(maninData).length === 0) {
          return {
            _data,
          };
        }

        maninData.data = secondData;

        if (this.dto) {
          _data = plainToInstance(this.dto, maninData, {
            excludeExtraneousValues: true,
          });
        }

        return _data;
      }),
    );
  }
}
