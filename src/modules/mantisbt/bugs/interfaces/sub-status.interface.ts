import { BasicEnumClass } from './basic.interface';

export class SubStatus extends BasicEnumClass {}

export interface SubStatusType {
  [key: number]: SubStatus;
}

/**
 * Status狀態
 * $s_status_enum_string = '10:新問題,20:需要回覆,30:已接受,40:已確認,50:已分配,80:已解決,90:已結束';
 * $s_status_enum_string = '10:new,20:feedback,30:acknowledged,40:confirmed,50:assigned,80:resolved,90:closed';
 */
export const SubStatusKeyEnum = {
  new_10: 10, // 新問題
  future_plan_15: 15, // 未來計畫
  feedback_20: 20, // 等待回覆
  backlog_30: 30, // 待辦事項
  todo_40: 40, // 即將開始
  doing_50: 50, // 進行中
  resolved_80: 80, // 已解決
  resolved_for_release_82: 82, // 已解決/等待發佈
  completed_90: 90, // 已完成
  closed_92: 92, // 已結案
  canceled_94: 94, // 已取消
};

/**
 * SubStatus狀態
 * 10:新問題 new,
 * 15:未來計畫 future plan,
 * 20:等待回覆 feedback,
 * 30:待辦事項 backlog,
 * 40:即將開始 todo,
 * 50:進行中 doing,
 * 80:已解決 resolved,
 * 82:等待發佈 resolved for release,
 * 90:已完成 completed,
 * 92:已結案 closed,
 * 94:已取消 canceled
 */
export const SubStatusEnum: Readonly<SubStatusType> = {
  [SubStatusKeyEnum.new_10]: {
    id: SubStatusKeyEnum.new_10,
    name: 'new',
    label: '新問題',
  },
  [SubStatusKeyEnum.future_plan_15]: {
    id: SubStatusKeyEnum.future_plan_15,
    name: 'future_plan',
    label: '未來計畫',
  },
  [SubStatusKeyEnum.feedback_20]: {
    id: SubStatusKeyEnum.feedback_20,
    name: 'awaiting_feedback',
    label: '等待回覆',
  },
  [SubStatusKeyEnum.backlog_30]: {
    id: SubStatusKeyEnum.backlog_30,
    name: 'backlog',
    label: '待辦事項',
  },
  [SubStatusKeyEnum.todo_40]: {
    id: SubStatusKeyEnum.todo_40,
    name: 'todo',
    label: '即將開始',
  },
  [SubStatusKeyEnum.doing_50]: {
    id: SubStatusKeyEnum.doing_50,
    name: 'doing',
    label: '進行中',
  },
  [SubStatusKeyEnum.resolved_80]: {
    id: SubStatusKeyEnum.resolved_80,
    name: 'resolved',
    label: '已解決',
  },
  [SubStatusKeyEnum.resolved_for_release_82]: {
    id: SubStatusKeyEnum.resolved_for_release_82,
    name: 'resolved_for_release',
    label: '等待發佈',
  },
  [SubStatusKeyEnum.completed_90]: {
    id: SubStatusKeyEnum.completed_90,
    name: 'completed',
    label: '已完成',
  },
  [SubStatusKeyEnum.closed_92]: {
    id: SubStatusKeyEnum.closed_92,
    name: 'closed',
    label: '已結案',
  },
  [SubStatusKeyEnum.canceled_94]: {
    id: SubStatusKeyEnum.canceled_94,
    name: 'canceled',
    label: '已取消',
  },
};
