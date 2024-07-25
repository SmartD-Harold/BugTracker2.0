import { BasicEnumClass } from './basic.interface';

export class SponsorshipTotal extends BasicEnumClass {}

export interface SponsorshipTotalType {
  [key: number]: SponsorshipTotal;
}

export const SponsorshipTotalKeyEnum = {
  unpaid_0: 0,
  requested_1: 1,
  paid_2: 2,
};

// $s_sponsorship_enum_string = '0:Unpaid,1:Requested,2:Paid';
// $s_sponsorship_enum_string = '0:未付款,1:已請求支付,2:已付款';
export const SponsorshipTotalEnum: Readonly<SponsorshipTotalType> = {
  [SponsorshipTotalKeyEnum.unpaid_0]: {
    id: SponsorshipTotalKeyEnum.unpaid_0,
    name: 'Unpaid',
    label: '未付款',
  },
  [SponsorshipTotalKeyEnum.requested_1]: {
    id: SponsorshipTotalKeyEnum.requested_1,
    name: 'Requested',
    label: '已請求支付',
  },
  [SponsorshipTotalKeyEnum.paid_2]: {
    id: SponsorshipTotalKeyEnum.paid_2,
    name: 'Paid',
    label: '已付款',
  },
};
