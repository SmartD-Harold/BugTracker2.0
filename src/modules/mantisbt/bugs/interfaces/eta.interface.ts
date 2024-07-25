import { BasicEnumClass } from './basic.interface';

export class ETA extends BasicEnumClass {}

export interface ETAType {
  [key: number]: ETA;
}

export const ETAKeyEnum = {
  none_10: 10,
  lessThan1Day_20: 20,
  twoToThreeDays_30: 30,
  lessThan1Week_40: 40,
  lessThan1Month_50: 50,
  moreThan1Month_60: 60,
};

// $s_eta_enum_string = '10:none,20:< 1 day,30:2-3 days,40:< 1 week,50:< 1 month,60:> 1 month';
// $s_eta_enum_string = '10:無,20:< 1 天,30:2-3 天,40:< 一星期,50:< 一個月,60:> 一個月';
export const ETAEnum: Readonly<ETAType> = {
  [ETAKeyEnum.none_10]: {
    id: ETAKeyEnum.none_10,
    name: 'none',
    label: '無',
  },
  [ETAKeyEnum.lessThan1Day_20]: {
    id: ETAKeyEnum.lessThan1Day_20,
    name: 'lessThan1Day',
    label: '< 1 day',
  },
  [ETAKeyEnum.twoToThreeDays_30]: {
    id: ETAKeyEnum.twoToThreeDays_30,
    name: 'twoToThreeDays',
    label: '2-3 days',
  },
  [ETAKeyEnum.lessThan1Week_40]: {
    id: ETAKeyEnum.lessThan1Week_40,
    name: 'lessThan1Week',
    label: '< 1 week',
  },
  [ETAKeyEnum.lessThan1Month_50]: {
    id: ETAKeyEnum.lessThan1Month_50,
    name: 'lessThan1Month',
    label: '< 1 month',
  },
  [ETAKeyEnum.moreThan1Month_60]: {
    id: ETAKeyEnum.moreThan1Month_60,
    name: 'moreThan1Month',
    label: '> 1 month',
  },
};
