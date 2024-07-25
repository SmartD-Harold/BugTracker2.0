import {
  Exclude,
  Expose,
  plainToInstance,
  Transform,
  Type,
} from 'class-transformer';

class Project {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

class Category {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

class User {
  @Expose()
  id: number;

  @Expose()
  name: string;

  // @Expose()
  realName: string;

  @Expose()
  email: string;
}

class HandlerUser extends User {
  @Expose()
  title: string;

  @Expose()
  dept: string;
}

const issuesStatus = {
  confirmed: '已確認',
  assigned: '已指派',
};
class Status {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }: { obj: Status }) => {
    return issuesStatus[obj.name] ?? '';
  })
  label: string;
}

const issuesPriority = {
  low: '低',
  normal: '一般',
  high: '重要',
  urgent: '緊急',
};

class Priority {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }: { obj: Priority }) => issuesPriority[obj.name] ?? '')
  label: string;
}

const issuesSeverity = {
  major: '重要緊急',
  minor: '重要不緊急',
  tweak: '緊急不重要',
  trivial: '不緊急不重要',
};

class Severity {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }: { obj: Severity }) => issuesSeverity[obj.name] ?? '')
  label: string;
}
const issuesReproducibility = {
  always: '總是',
  sometimes: '有時',
  random: '隨機',
  'have not tried': '尚未嘗試',
  'unable to reproduce': '無法重現',
  'N/A': '不適用',
};
class Reproducibility {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Transform(
    ({ obj }: { obj: Reproducibility }) =>
      issuesReproducibility[obj.name] ?? '',
  )
  label: string;
}

export class DBAzureEntityMini {
  @Expose()
  statusId: null | string;

  @Expose()
  statusLabel: null | string;

  @Expose()
  link: string;

  @Expose()
  isClosed: boolean;
}

export class DBProjectFunctionMini {
  @Expose()
  id: number;

  @Expose()
  projectsId: number;

  @Expose()
  name: string;
}

// apartment_complexes
export class DBApartmentComplexMini {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  city: string;
}

export class DBIssueData {
  @Expose()
  id: string;

  @Expose()
  uuid: string;

  @Expose()
  mantisBugId: number;

  @Expose()
  serviceTargetType: string;

  @Expose()
  @Type(() => DBProjectFunctionMini)
  projectFunction: DBProjectFunctionMini;

  @Expose()
  @Type(() => DBApartmentComplexMini)
  apartmentComplex: DBApartmentComplexMini;

  @Expose()
  statueCode: string;

  @Expose()
  statueName: string;

  @Expose()
  subStatueCode: string;

  @Expose()
  subStatueName: string;

  @Expose()
  handlerType: string;

  @Expose()
  handlerId: number;

  @Expose()
  handlerUserId: number;

  @Expose()
  @Type(() => Date)
  expiresAt: Date;

  @Expose()
  @Type(() => Date)
  archiveAt: Date;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  @Exclude()
  @Type(() => DBAzureEntityMini)
  azureTasks: DBAzureEntityMini;
}

export class GetIssueMiniTypeDto {
  @Expose()
  id: number;

  @Expose()
  summary: string;

  @Expose()
  @Transform(({ value }: { value: Project }) => value.name)
  project: Project;

  @Expose()
  @Transform(({ value }: { value: Category }) => value.name)
  category: Category;

  @Expose()
  @Transform(({ value }: { value: User }) => value.name)
  @Type(() => User)
  reporter: User;

  @Expose()
  @Transform(({ value }: { value: HandlerUser }) => {
    return {
      id: value.id,
      name: value.name,
      email: value.email,
      title: 'ST',
      dept: '今網智慧',
    };
  })
  @Type(() => HandlerUser)
  handler: HandlerUser;

  @Expose()
  @Type(() => Status)
  public status: Status;

  @Expose()
  @Type(() => Priority)
  priority: Priority;

  @Expose()
  @Type(() => Severity)
  severity: Severity;

  @Expose()
  @Type(() => Reproducibility)
  reproducibility: Reproducibility;

  @Expose()
  @Transform(({ obj }) => obj.notes?.length ?? 0)
  notesCount: number;

  @Expose()
  @Transform(({ obj }) => {
    if (Object.keys(obj.data).length == 0) return new DBAzureEntityMini();
    return plainToInstance(DBAzureEntityMini, obj.data?.azureTasks, {
      excludeExtraneousValues: true,
    });
  })
  @Type(() => DBAzureEntityMini)
  azure: DBAzureEntityMini;

  @Expose()
  @Type(() => DBIssueData)
  data: DBIssueData;
}
