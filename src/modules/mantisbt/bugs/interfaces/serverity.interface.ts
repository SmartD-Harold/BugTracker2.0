import { BasicEnumClass } from './basic.interface';

export class Severity extends BasicEnumClass {}

export interface SeverityType {
  [key: number]: Severity;
}

export const SeverityKeyEnum = {
  feature_10: 10,
  trivial_20: 20,
  text_30: 30,
  tweak_40: 40,
  minor_50: 50,
  major_60: 60,
  crash_70: 70,
  block_80: 80,
};

// $s_severity_enum_string = '10:feature,20:trivial,30:text,40:tweak,50:minor,60:major,70:crash,80:block';
// $s_severity_enum_string = '10:新功能,20:細節,30:文字,40:調整,50:次要,60:重要,70:當機,80:沒有反應';
export const SeverityEnum: Readonly<SeverityType> = {
  [SeverityKeyEnum.feature_10]: {
    id: SeverityKeyEnum.feature_10,
    name: 'feature',
    label: '新功能',
  },
  [SeverityKeyEnum.trivial_20]: {
    id: SeverityKeyEnum.trivial_20,
    name: 'trivial',
    label: '細節',
  },
  [SeverityKeyEnum.text_30]: {
    id: SeverityKeyEnum.text_30,
    name: 'text',
    label: '文字',
  },
  [SeverityKeyEnum.tweak_40]: {
    id: SeverityKeyEnum.tweak_40,
    name: 'tweak',
    label: '調整',
  },
  [SeverityKeyEnum.minor_50]: {
    id: SeverityKeyEnum.minor_50,
    name: 'minor',
    label: '次要',
  },
  [SeverityKeyEnum.major_60]: {
    id: SeverityKeyEnum.major_60,
    name: 'major',
    label: '重要',
  },
  [SeverityKeyEnum.crash_70]: {
    id: SeverityKeyEnum.crash_70,
    name: 'crash',
    label: '當機',
  },
  [SeverityKeyEnum.block_80]: {
    id: SeverityKeyEnum.block_80,
    name: 'block',
    label: '沒有反應',
  },
};
