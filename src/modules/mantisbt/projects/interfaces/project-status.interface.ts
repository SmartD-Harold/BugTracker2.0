import { BasicEnumClass } from '../../bugs/interfaces/basic.interface';

export class ProjectStatus extends BasicEnumClass {
  id: number;
  name: string;
  label: string;
}

interface ProjectStatusType {
  [key: number]: ProjectStatus;
}

export const ProjectStatusKeys = {
  development_10: 10,
  release_30: 30,
  stable_50: 50,
  obsolete_70: 70,
};

// '10:development,30:release,50:stable,70:obsolete';
// '10:開發中,30:已發佈,50:穩定,70:停止維護';
export const ProjectStatusEnum: ProjectStatusType = {
  [ProjectStatusKeys.development_10]: {
    id: ProjectStatusKeys.development_10,
    name: 'development',
    label: '開發中',
  },
  [ProjectStatusKeys.release_30]: {
    id: ProjectStatusKeys.release_30,
    name: 'release',
    label: '已發佈',
  },
  [ProjectStatusKeys.stable_50]: {
    id: ProjectStatusKeys.stable_50,
    name: 'stable',
    label: '穩定',
  },
  [ProjectStatusKeys.obsolete_70]: {
    id: ProjectStatusKeys.obsolete_70,
    name: 'obsolete',
    label: '停止維護',
  },
};
