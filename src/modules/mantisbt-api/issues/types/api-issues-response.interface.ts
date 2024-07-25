type NameAndIdType = {
  id: number;
  name: string;
};

type BasicType = NameAndIdType & {
  label: string;
};

export type UserType = NameAndIdType & {
  realName: string;
  email: string;
};

export type StatusType = BasicType & {
  color?: string;
};

export type RelationshipType = {
  id: number;
  type: BasicType;
  issue: {
    id: number;
    status: StatusType;
    resolution?: BasicType;
    summary: string;
    handler?: UserType;
  };
};

export type CustomFieldType = {
  field: NameAndIdType;
  value: string;
};

export type HistoryType = {
  createdAt: string;
  user: UserType;
  type: NameAndIdType;
  message: string;
  relationship?: BasicType;
  issue?: {
    id: number;
  };
  field?: {
    name: string;
    label: string;
  };
  oldValue?: {
    id: number;
    name?: string;
    label?: string;
    color?: string;
  };
  newValue?: {
    id: number;
    name?: string;
    realName?: string;
    email?: string;
    label?: string;
    color?: string;
  };
  change?: string;
};

export type NoteType = {
  id: number;
  reporter: UserType;
  text: string;
  viewState: BasicType;
  attachments?: any[];
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type IssueFromDBType = {
  id: string;
  mantisBugId: number;
  serviceTargetId: null | string;
  projectFunctionId: null | string;
  statueCode: null | string;
  statueName: null | string;
  subStatueCode: null | string;
  subStatueName: null | string;
  handlerType: null | string;
  handlerId: number;
  handlerUserId: number;
  deviceName: null | string;
  deviceNote: null | string;
  expiresAt: null | string;
  archiveAt: null | string;
  createdAt: string;
  updatedAt: string;
};

export type IssuesFromAPIType = {
  id: number;
  summary: string;
  description: string;
  project: NameAndIdType;
  category: NameAndIdType;
  reporter: UserType;
  handler: UserType;
  status: StatusType;
  resolution: BasicType;
  viewState: BasicType;
  priority: BasicType;
  severity: BasicType;
  reproducibility: BasicType;
  sticky: boolean;
  createdAt: string;
  updatedAt: string;
  notes?: NoteType[];
  relationships?: RelationshipType[];
  customFields?: CustomFieldType[];
  history?: HistoryType[];
};

export type IssuesWithDataType = IssuesFromAPIType & {
  data?: IssueFromDBType;
};

//{
//   "message": "Issue #1234 not found",
//   "code": 1100,
//   "localized": "Issue 1234 not found."
// }
export type AddIssueRelationResultType = {
  message: string;
  code: number;
  localized: string;
};
