import { BasicEnumClass } from './basic.interface';

export class Reproducibility extends BasicEnumClass {}

export interface ReproducibilityType {
  [key: number]: Reproducibility;
}

export const ReproducibilityKeyEnum = {
  always_10: 10,
  sometimes_30: 30,
  random_50: 50,
  haveNotTried_70: 70,
  unableToReproduce_90: 90,
  NA_100: 100,
};

// $s_reproducibility_enum_string = '10:always,30:sometimes,50:random,70:have not tried,90:unable to reproduce,100:N/A';
// $s_reproducibility_enum_string = '10:持續,30:時常,50:隨機,70:尚未嘗試,90:無法重現,100:不適用';
export const ReproducibilityEnum: Readonly<ReproducibilityType> = {
  [ReproducibilityKeyEnum.always_10]: {
    id: ReproducibilityKeyEnum.always_10,
    name: 'always',
    label: '持續',
  },
  [ReproducibilityKeyEnum.sometimes_30]: {
    id: ReproducibilityKeyEnum.sometimes_30,
    name: 'sometimes',
    label: '時常',
  },
  [ReproducibilityKeyEnum.random_50]: {
    id: ReproducibilityKeyEnum.random_50,
    name: 'random',
    label: '隨機',
  },
  [ReproducibilityKeyEnum.haveNotTried_70]: {
    id: ReproducibilityKeyEnum.haveNotTried_70,
    name: 'have not tried',
    label: '尚未嘗試',
  },
  [ReproducibilityKeyEnum.unableToReproduce_90]: {
    id: ReproducibilityKeyEnum.unableToReproduce_90,
    name: 'unable to reproduce',
    label: '無法重現',
  },
  [ReproducibilityKeyEnum.NA_100]: {
    id: ReproducibilityKeyEnum.NA_100,
    name: 'N/A',
    label: '不適用',
  },
};
