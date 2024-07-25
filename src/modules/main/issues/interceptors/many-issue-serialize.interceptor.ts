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

type DatasType = {
  title: string;
  data: {
    [key: string]: any;
  }[];
};

export function ManyIssueSerialize(dto: ClassConstructor = null) {
  return UseInterceptors(new ManyIssueSerializeInterceptor(dto));
}
export class ManyIssueSerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: DatasType) => {
        for (const [index, innerData] of data.data.entries()) {
          const { mantisbt, bugtracker } = innerData;
          console.log('mantisbt');
          console.log(mantisbt);
          if (Object.keys(mantisbt).length === 0) {
            data.data[index] = {
              ...mantisbt,
              data: null,
            };
            continue;
          }
          data.data[index] = {
            ...mantisbt,
            data: bugtracker,
          };

          if (this.dto) {
            data.data[index] = plainToInstance(this.dto, data.data[index], {
              excludeExtraneousValues: true,
            });
          }
        }

        return data;
      }),
    );
  }
}
