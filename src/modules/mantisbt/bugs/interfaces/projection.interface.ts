import { BasicEnumClass } from './basic.interface';

export class Projection extends BasicEnumClass {}

export interface ProjectionType {
  [key: number]: Projection;
}

export const ProjectionKeyEnum = {
  none_10: 10,
  tweak_30: 30,
  minorFix_50: 50,
  majorRework_70: 70,
  redesign_90: 90,
};

// $s_projection_enum_string = '10:none,30:tweak,50:minor fix,70:major rework,90:redesign';
// $s_projection_enum_string = '10:沒有,30:些微調整,50:小幅修正,70:重要修正,90:重新設計';
export const ProjectionEnum: Readonly<ProjectionType> = {
  [ProjectionKeyEnum.none_10]: {
    id: ProjectionKeyEnum.none_10,
    name: 'none',
    label: '沒有',
  },
  [ProjectionKeyEnum.tweak_30]: {
    id: ProjectionKeyEnum.tweak_30,
    name: 'tweak',
    label: '些微調整',
  },
  [ProjectionKeyEnum.minorFix_50]: {
    id: ProjectionKeyEnum.minorFix_50,
    name: 'minor fix',
    label: '小幅修正',
  },
  [ProjectionKeyEnum.majorRework_70]: {
    id: ProjectionKeyEnum.majorRework_70,
    name: 'major rework',
    label: '重要修正',
  },
  [ProjectionKeyEnum.redesign_90]: {
    id: ProjectionKeyEnum.redesign_90,
    name: 'redesign',
    label: '重新設計',
  },
};
