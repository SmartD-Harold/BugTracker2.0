import { BasicEnumClass } from './basic.interface';

export class Resolution extends BasicEnumClass {}

export interface ResolutionType {
  [key: number]: Resolution;
}

export const ResolutionKeyEnum = {
  open_10: 10,
  fixed_20: 20,
  reopened_30: 30,
  unableToReproduce_40: 40,
  notFixable_50: 50,
  duplicate_60: 60,
  noChangeRequired_70: 70,
  suspended_80: 80,
  wontFix_90: 90,
};

// $s_resolution_enum_string = '10:open,20:fixed,30:reopened,40:unable to reproduce,50:not fixable,60:duplicate,70:no change required,80:suspended,90:won\'t fix';
// $s_resolution_enum_string = '10:尚未分析,20:已修正,30:已重啟,40:無法重現,50:無法修復,60:重複問題,70:無須修正,80:暫緩處理,90:不做處理';
export const ResolutionEnum: Readonly<ResolutionType> = {
  [ResolutionKeyEnum.open_10]: {
    id: ResolutionKeyEnum.open_10,
    name: 'open',
    label: '尚未分析',
  },
  [ResolutionKeyEnum.fixed_20]: {
    id: ResolutionKeyEnum.fixed_20,
    name: 'fixed',
    label: '已修正',
  },
  [ResolutionKeyEnum.reopened_30]: {
    id: ResolutionKeyEnum.reopened_30,
    name: 'reopened',
    label: '已重啟',
  },
  [ResolutionKeyEnum.unableToReproduce_40]: {
    id: ResolutionKeyEnum.unableToReproduce_40,
    name: 'unable to reproduce',
    label: '無法重現',
  },
  [ResolutionKeyEnum.notFixable_50]: {
    id: ResolutionKeyEnum.notFixable_50,
    name: 'not fixable',
    label: '無法修復',
  },
  [ResolutionKeyEnum.duplicate_60]: {
    id: ResolutionKeyEnum.duplicate_60,
    name: 'duplicate',
    label: '重複問題',
  },
  [ResolutionKeyEnum.noChangeRequired_70]: {
    id: ResolutionKeyEnum.noChangeRequired_70,
    name: 'no change required',
    label: '無須修正',
  },
  [ResolutionKeyEnum.suspended_80]: {
    id: ResolutionKeyEnum.suspended_80,
    name: 'suspended',
    label: '暫緩處理',
  },
  [ResolutionKeyEnum.wontFix_90]: {
    id: ResolutionKeyEnum.wontFix_90,
    name: "won't fix",
    label: '不做處理',
  },
};
