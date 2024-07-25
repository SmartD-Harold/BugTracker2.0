import { BasicEnumClass } from '../../bugs/interfaces/basic.interface';

export class AccessLevel extends BasicEnumClass {
  id: number;
  name: string;
  label: string;
}

interface AccessLevelType {
  [key: number]: AccessLevel;
}

export const AccessLevelKeys = {
  viewer_10: 10,
  reporter_25: 25,
  updater_40: 40,
  developer_55: 55,
  manager_70: 70,
  administrator_90: 90,
};

//$s_access_levels_enum_string = '10:viewer,25:reporter,40:updater,55:developer,70:manager,90:administrator';
//$s_access_levels_enum_string = '10:檢視者,25:回報人,40:更新者,55:開發者,70:專案管理者,90:系統管理者';
export const AccessLevelTypeEnum: AccessLevelType = {
  [AccessLevelKeys.viewer_10]: {
    id: AccessLevelKeys.viewer_10,
    name: 'viewer',
    label: '檢視者',
  },
  [AccessLevelKeys.reporter_25]: {
    id: AccessLevelKeys.reporter_25,
    name: 'reporter',
    label: '回報人',
  },
  [AccessLevelKeys.updater_40]: {
    id: AccessLevelKeys.updater_40,
    name: 'updater',
    label: '更新者',
  },
  [AccessLevelKeys.developer_55]: {
    id: AccessLevelKeys.developer_55,
    name: 'developer',
    label: '開發者',
  },
  [AccessLevelKeys.manager_70]: {
    id: AccessLevelKeys.manager_70,
    name: 'manager',
    label: '專案管理者',
  },
  [AccessLevelKeys.administrator_90]: {
    id: AccessLevelKeys.administrator_90,
    name: 'administrator',
    label: '系統管理者',
  },
};
