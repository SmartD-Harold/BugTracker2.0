import { BasicEnumClass } from './basic.interface';

export class Status extends BasicEnumClass {}

export interface StatusType {
  [key: number]: Status;
}
export const StatusKeyEnum = {
  new_10: 10,
  feedback_20: 20,
  acknowledged_30: 30,
  confirmed_40: 40,
  assigned_50: 50,
  resolved_80: 80,
  closed_90: 90,
};

export const StatusMappingKeyEnum = {
  new_10: StatusKeyEnum.new_10, // 新問題
  feedback_20: StatusKeyEnum.feedback_20, // 等待回覆
  backlog_30: StatusKeyEnum.acknowledged_30, // 待辦事項
  todo_40: StatusKeyEnum.confirmed_40, // 即將開始
  doing_50: StatusKeyEnum.assigned_50, // 進行中
  resolved_80: StatusKeyEnum.resolved_80, // 已解決
  completed_90: StatusKeyEnum.closed_90, // 已完成
};

/**
 * 狀態
 * $s_status_enum_string = '10:新問題,20:需要回覆,30:已接受,40:已確認,50:已分配,80:已解決,90:已結束';
 * $s_status_enum_string = '10:new,20:feedback,30:acknowledged,40:confirmed,50:assigned,80:resolved,90:closed';
 * 10:新問題 new: 10:new,
 * 20:需要回覆 feedback: 20:review,
 * 30:已接受 acknowledged: 30:backlog,
 * 40:已確認 confirmed: 40:todo,
 * 50:已分配 assigned: 50:doing,
 * 80:已解決 resolved: 80:resolved,
 * 90:已結束 closed: 90:completed
 */
export const StatusEnum: Readonly<StatusType> = {
  [StatusKeyEnum.new_10]: {
    id: StatusKeyEnum.new_10,
    name: 'new',
    label: '新問題',
  },
  [StatusKeyEnum.feedback_20]: {
    id: StatusKeyEnum.feedback_20,
    name: 'feedback',
    label: '需要回覆',
  },
  [StatusKeyEnum.acknowledged_30]: {
    id: StatusKeyEnum.acknowledged_30,
    name: 'acknowledged',
    label: '已接受',
  },
  [StatusKeyEnum.confirmed_40]: {
    id: StatusKeyEnum.confirmed_40,
    name: 'confirmed',
    label: '已確認',
  },
  [StatusKeyEnum.assigned_50]: {
    id: StatusKeyEnum.assigned_50,
    name: 'assigned',
    label: '已分配',
  },
  [StatusKeyEnum.resolved_80]: {
    id: StatusKeyEnum.resolved_80,
    name: 'resolved',
    label: '已解決',
  },
  [StatusKeyEnum.closed_90]: {
    id: StatusKeyEnum.closed_90,
    name: 'closed',
    label: '已結束',
  },
};

export const StatusMappingEnum: StatusType = {
  [StatusMappingKeyEnum.new_10]: {
    id: StatusKeyEnum.new_10,
    name: 'new', // new
    label: '新問題', // 新問題
  },
  [StatusMappingKeyEnum.feedback_20]: {
    id: StatusKeyEnum.feedback_20,
    name: 'feedback', // feedback
    label: '等待回覆', // 需要回覆
  },
  [StatusMappingKeyEnum.backlog_30]: {
    id: StatusKeyEnum.acknowledged_30,
    name: 'backlog', // acknowledged
    label: '待辦事項', // 已接受
  },
  [StatusMappingKeyEnum.todo_40]: {
    id: StatusKeyEnum.confirmed_40,
    name: 'todo', // confirmed
    label: '即將開始', // 已確認
  },
  [StatusMappingKeyEnum.doing_50]: {
    id: StatusKeyEnum.assigned_50,
    name: 'doing', // assigned
    label: '進行中', // 已分配
  },
  [StatusMappingKeyEnum.resolved_80]: {
    id: StatusKeyEnum.resolved_80,
    name: 'resolved', // resolved
    label: '已解決', // 已解決
  },
  [StatusMappingKeyEnum.completed_90]: {
    id: StatusKeyEnum.closed_90,
    name: 'completed', // closed
    label: '已完成', // 已結束
  },
};
