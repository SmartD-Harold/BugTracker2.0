import { BasicEnumClass } from '../../bugs/interfaces/basic.interface';

export class ProjectViewStatue extends BasicEnumClass {
  id: number;
  name: string;
  label: string;
}

interface ProjectViewStatueType {
  [key: number]: ProjectViewStatue;
}

export const ProjectViewStatueKeys = {
  public_10: 10,
  private_50: 50,
};

// $s_view_state_enum_string = '10:public,50:private';
// $s_view_state_enum_string = '10:公開,50:非公開';
export const ProjectViewStatueEnum: ProjectViewStatueType = {
  [ProjectViewStatueKeys.public_10]: {
    id: ProjectViewStatueKeys.public_10,
    name: 'public',
    label: '公開',
  },
  [ProjectViewStatueKeys.private_50]: {
    id: ProjectViewStatueKeys.private_50,
    name: 'private',
    label: '非公開',
  },
};
