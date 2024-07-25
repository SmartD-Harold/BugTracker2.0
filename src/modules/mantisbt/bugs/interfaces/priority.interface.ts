import { BasicEnumClass } from './basic.interface';
export class Priority extends BasicEnumClass {}

export interface PriorityType {
  [key: number]: Priority;
}

export const PriorityKeyEnum = {
  none_10: 10,
  low_20: 20,
  normal_30: 30,
  high_40: 40,
  urgent_50: 50,
  immediate_60: 60,
};

// '10:none,20:low,30:normal,40:high,50:urgent,60:immediate';
// '10:無,20:低,30:一般,40:高,50:緊急,60:立即';
export const PriorityEnum: Readonly<PriorityType> = {
  [PriorityKeyEnum.none_10]: {
    id: PriorityKeyEnum.none_10,
    name: 'none',
    label: '無',
  },
  [PriorityKeyEnum.low_20]: {
    id: PriorityKeyEnum.low_20,
    name: 'low',
    label: '低',
  },
  [PriorityKeyEnum.normal_30]: {
    id: PriorityKeyEnum.normal_30,
    name: 'normal',
    label: '一般',
  },
  [PriorityKeyEnum.high_40]: {
    id: PriorityKeyEnum.high_40,
    name: 'high',
    label: '高',
  },
  [PriorityKeyEnum.urgent_50]: {
    id: PriorityKeyEnum.urgent_50,
    name: 'urgent',
    label: '緊急',
  },
  [PriorityKeyEnum.immediate_60]: {
    id: PriorityKeyEnum.immediate_60,
    name: 'immediate',
    label: '立即',
  },
};
