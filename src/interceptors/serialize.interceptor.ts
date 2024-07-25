import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { MetadataType } from '../modules/bugtracker/issues/types/issues-metadata.interface';
import { DBIssueData } from '../modules/bugtracker/issues/dto/get-issues.dto';
import { IssuesFromAPIType } from '../modules/mantisbt-api/issues/types/api-issues-response.interface';

interface ClassConstructor {
  new (...args: any[]): any;
}

type DataType = {
  title: string;
  apiData: IssuesFromAPIType[];
  dbData: Map<number, DBIssueData>;
  page: number;
  size: number;
};

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

type IssuesFromAPIWithDataType = IssuesFromAPIType & {
  data?: DBIssueData;
};

function serializeMetadata(
  size: number,
  page: number,
  data: IssuesFromAPIWithDataType[] = [],
): MetadataType {
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
        const { title, apiData, dbData, size, page } = data;

        const metadata = serializeMetadata(size, page, apiData);
        if (apiData.length === 0) {
          return {
            title,
            metadata,
            records: [],
          };
        }

        if (dbData.size > 0) {
          apiData.forEach((issue: any) => {
            issue.data = dbData.get(issue.id) || {};
          });
        }
        const _data = plainToInstance(this.dto, apiData, {
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
