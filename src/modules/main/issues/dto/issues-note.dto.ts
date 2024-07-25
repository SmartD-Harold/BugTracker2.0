import { Expose, Transform, Type } from 'class-transformer';

//            {
//                 "id": 13,
//                 "bugId": 35,
//                 "reporterId": 2,
//                 "bugnoteTextId": 13,
//                 "viewState": 10,
//                 "noteType": 0,
//                 "noteAttr": "",
//                 "lastModified": 1710836691,
//                 "dateSubmitted": 1710836691,
//                 "noteText": {
//                     "id": 13,
//                     "note": "身體狀況正常"
//                 },
//                 "reporter": {
//                     "id": 7,
//                     "account": "harold.jhan@smartdaily.com.tw",
//                     "userName": "Harold.jhan",
//                     "mantisbtUserId": 2,
//                     "enabled": true,
//                     "employee": {
//                         "employeeId": "S2309014",
//                         "name": "詹育穎",
//                         "isCompanyEmail": true,
//                         "department": "軟體研發部"
//                     }
//                 }

class IssuesNoteUserEmployeeDto {
  @Expose()
  employeeId: string;

  @Expose()
  name: string;

  @Expose()
  isCompanyEmail: boolean;

  @Expose()
  department: string;
}

class IssuesNoteReporterDto {
  @Expose()
  id: number;

  @Expose()
  account: string;

  @Expose()
  @Transform(({ obj }) => obj.account)
  email: string;

  @Expose()
  userName: string;

  @Expose()
  mantisbtUserId: number;

  @Expose()
  enabled: boolean;

  @Expose()
  @Type(() => IssuesNoteUserEmployeeDto)
  employee: IssuesNoteUserEmployeeDto;
}
export class IssuesNoteDto {
  @Expose()
  id: number;

  @Expose()
  bugId: number;

  @Expose()
  reporterId: number;

  @Expose()
  bugnoteTextId: number;

  @Expose()
  noteType: number;

  @Expose()
  noteAttr: number;

  // @Expose()
  // @Type(() => NoteTextDto)
  // noteText: NoteTextDto;

  @Expose()
  @Transform(({ obj }) => (obj.noteText?.id ? obj.noteText.id : ''))
  noteTextId: number;

  @Expose()
  @Transform(({ obj }) => (obj.noteText?.note ? obj.noteText.note : ''))
  noteTextNote: string;

  @Expose()
  @Type(() => IssuesNoteReporterDto)
  @Transform(({ obj }) => {
    console.log('  @Transform(({ obj }) => {');
    console.log(obj.reporter);
    return obj.reporter;
  })
  reporter?: IssuesNoteReporterDto;

  @Expose()
  @Type(() => Date)
  @Transform(({ obj }) =>
    obj.dateSubmitted ? new Date(obj.dateSubmitted) : null,
  )
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  @Transform(({ obj }) => (obj.lastUpdated ? new Date(obj.lastUpdated) : null))
  updatedAt: Date;
}
