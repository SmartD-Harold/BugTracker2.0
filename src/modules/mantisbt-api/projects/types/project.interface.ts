export type BasicType = {
  id: number;
  name: string;
  label: string;
};

export type CustomFieldType = {
  id: number;
  name: string;
  type: string;
  defaultValue: string;
  possibleValues: string;
  validRegexp: string;
  lengthMin: number;
  lengthMax: number;
  accessLevelR: BasicType;
  accessLevelRw: BasicType;
  displayReport: boolean;
  displayUpdate: boolean;
  displayResolved: boolean;
  displayClosed: boolean;
  requireReport: boolean;
  requireUpdate: boolean;
  requireResolved: boolean;
  requireClosed: boolean;
};

export type VersionType = {
  id: number;
  name: string;
  description: string;
  released: boolean;
  obsolete: boolean;
  timestamp: string;
};

export type MiniProjectType = {
  id: number;
  name: string;
};

export type CategoryType = {
  id: number;
  name: string;
  project: MiniProjectType;
};

export type SubProjectType = {
  id: number;
  name: string;
};

export type ProjectType = {
  id: number;
  name: string;
  status: BasicType;
  description: string;
  enabled: boolean;
  viewState: BasicType;
  accessLevel: BasicType;
  customFields?: CustomFieldType[];
  versions?: VersionType[];
  categories?: CategoryType[];
  subProjects?: SubProjectType[];
};
