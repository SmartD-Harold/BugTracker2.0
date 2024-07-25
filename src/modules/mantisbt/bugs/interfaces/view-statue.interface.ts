import { BasicEnumClass } from './basic.interface';

export class ViewStatue extends BasicEnumClass {}

export interface ViewStatueType {
  [key: number]: ViewStatue;
}

export const ViewStatueKeyEnum = {
  public_10: 10,
  private_50: 50,
};

// $s_view_state_enum_string = '10:public,50:private';
// $s_view_state_enum_string = '10:公開,50:非公開';
export const ViewStatueEnum: Readonly<ViewStatueType> = {
  [ViewStatueKeyEnum.public_10]: {
    id: ViewStatueKeyEnum.public_10,
    name: 'public',
    label: '公開',
  },
  [ViewStatueKeyEnum.private_50]: {
    id: ViewStatueKeyEnum.private_50,
    name: 'private',
    label: '非公開',
  },
};
