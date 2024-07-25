import { BasicEnumClass } from './basic.interface';

export class History extends BasicEnumClass {}
interface HistoryType {
  [key: number]: History;
}

export const HistoryKeyEnum = {
  NORMAL_TYPE_0: 0,
  NEW_BUG_1: 1,
  BUGNOTE_ADDED_2: 2,
  BUGNOTE_UPDATED_3: 3,
  BUGNOTE_DELETED_4: 4,
  DESCRIPTION_UPDATED_6: 6,
  ADDITIONAL_INFO_UPDATED_7: 7,
  STEP_TO_REPRODUCE_UPDATED_8: 8,
  FILE_ADDED_9: 9,
  FILE_DELETED_10: 10,
  BUGNOTE_STATE_CHANGED_11: 11,
  BUG_MONITOR_12: 12,
  BUG_UNMONITOR_13: 13,
  BUG_DELETED_14: 14,
  BUG_ADD_SPONSORSHIP_15: 15,
  BUG_UPDATE_SPONSORSHIP_16: 16,
  BUG_DELETE_SPONSORSHIP_17: 17,
  BUG_ADD_RELATIONSHIP_18: 18,
  BUG_DEL_RELATIONSHIP_19: 19,
  BUG_CLONED_TO_20: 20,
  BUG_CREATED_FROM_21: 21,
  BUG_REPLACE_RELATIONSHIP_23: 23,
  BUG_PAID_SPONSORSHIP_24: 24,
  TAG_ATTACHED_25: 25,
  TAG_DETACHED_26: 26,
  TAG_RENAMED_27: 27,
  BUG_REVISION_DROPPED_28: 28,
  BUGNOTE_REVISION_DROPPED_29: 29,
  PLUGIN_HISTORY_100: 100,
};

//https://github.com/mantisbt/mantisbt/blob/master/core/constant_inc.php#L181
export const HistoryEnum: Readonly<HistoryType> = {
  [HistoryKeyEnum.NORMAL_TYPE_0]: {
    id: HistoryKeyEnum.NORMAL_TYPE_0,
    name: 'NORMAL_TYPE',
    label: '欄位狀態',
  },
  [HistoryKeyEnum.NEW_BUG_1]: {
    id: HistoryKeyEnum.NEW_BUG_1,
    name: 'NEW_BUG', // lang_get( 'new_bug' )  $s_new_bug = '新增問題';
    label: '新增問題',
  },
  [HistoryKeyEnum.BUGNOTE_UPDATED_3]: {
    id: HistoryKeyEnum.BUGNOTE_UPDATED_3,
    name: 'BUGNOTE_UPDATED', // lang_get( 'bugnote_edited' )  $s_bugnote_edited = '編輯註解';
    label: '編輯註解',
  },
  [HistoryKeyEnum.BUGNOTE_DELETED_4]: {
    id: HistoryKeyEnum.BUGNOTE_DELETED_4,
    name: 'BUGNOTE_DELETED', // lang_get( 'bugnote_deleted' )  $s_bugnote_deleted = '刪除註解';
    label: '刪除註解',
  },
  [HistoryKeyEnum.DESCRIPTION_UPDATED_6]: {
    id: HistoryKeyEnum.DESCRIPTION_UPDATED_6,
    name: 'DESCRIPTION_UPDATED', // lang_get( 'description_updated' )  $s_description_updated = '更新描述';
    label: '更新描述',
  },
  [HistoryKeyEnum.ADDITIONAL_INFO_UPDATED_7]: {
    id: HistoryKeyEnum.ADDITIONAL_INFO_UPDATED_7,
    name: 'ADDITIONAL_INFO_UPDATED', // lang_get( 'additional_information_updated' )  $s_additional_information_updated = '更新附加資訊';
    label: '更新附加資訊',
  },
  [HistoryKeyEnum.STEP_TO_REPRODUCE_UPDATED_8]: {
    id: HistoryKeyEnum.STEP_TO_REPRODUCE_UPDATED_8,
    name: 'STEP_TO_REPRODUCE_UPDATED', // lang_get( 'steps_to_reproduce_updated' )  $s_steps_to_reproduce_updated = '更新重現步驟';
    label: '更新重現步驟',
  },
  [HistoryKeyEnum.FILE_ADDED_9]: {
    id: HistoryKeyEnum.FILE_ADDED_9,
    name: 'FILE_ADDED', // lang_get( 'file_added' )  $s_file_added = '新增檔案';
    label: '新增檔案',
  },
  [HistoryKeyEnum.FILE_DELETED_10]: {
    id: HistoryKeyEnum.FILE_DELETED_10,
    name: 'FILE_DELETED', // lang_get( 'file_deleted' )  $s_file_deleted = '刪除檔案';
    label: '刪除檔案',
  },
  [HistoryKeyEnum.BUGNOTE_STATE_CHANGED_11]: {
    id: HistoryKeyEnum.BUGNOTE_STATE_CHANGED_11,
    name: 'BUGNOTE_STATE_CHANGED', // lang_get( 'bugnote_view_state' )  $s_bugnote_view_state = '註解狀態';
    label: '註解狀態',
  },
  [HistoryKeyEnum.BUG_MONITOR_12]: {
    id: HistoryKeyEnum.BUG_MONITOR_12,
    name: 'BUG_MONITOR', // lang_get( 'bug_monitor' )  $s_bug_monitor = '監視問題';
    label: '監視問題',
  },
  [HistoryKeyEnum.BUG_UNMONITOR_13]: {
    id: HistoryKeyEnum.BUG_UNMONITOR_13,
    name: 'BUG_UNMONITOR', // lang_get( 'bug_end_monitor' )  $s_bug_end_monitor = '結束監視';
    label: '結束監視',
  },
  [HistoryKeyEnum.BUG_DELETED_14]: {
    id: HistoryKeyEnum.BUG_DELETED_14,
    name: 'BUG_DELETED', // lang_get( 'bug_deleted' )  $s_bug_deleted = '刪除問題';
    label: '刪除問題',
  },
  [HistoryKeyEnum.BUG_ADD_SPONSORSHIP_15]: {
    id: HistoryKeyEnum.BUG_ADD_SPONSORSHIP_15,
    name: 'BUG_ADD_SPONSORSHIP', // lang_get( 'sponsorship_added' )  $s_sponsorship_added = '新增贊助';
    label: '新增贊助',
  },
  [HistoryKeyEnum.BUG_UPDATE_SPONSORSHIP_16]: {
    id: HistoryKeyEnum.BUG_UPDATE_SPONSORSHIP_16,
    name: 'BUG_UPDATE_SPONSORSHIP', // lang_get( 'sponsorship_updated' )  $s_sponsorship_updated = '更新贊助';
    label: '更新贊助',
  },
  [HistoryKeyEnum.BUG_DELETE_SPONSORSHIP_17]: {
    id: HistoryKeyEnum.BUG_DELETE_SPONSORSHIP_17,
    name: 'BUG_DELETE_SPONSORSHIP', // lang_get( 'sponsorship_deleted' )  $s_sponsorship_deleted = '刪除贊助';
    label: '刪除贊助',
  },
  [HistoryKeyEnum.BUG_ADD_RELATIONSHIP_18]: {
    id: HistoryKeyEnum.BUG_ADD_RELATIONSHIP_18,
    name: 'BUG_ADD_RELATIONSHIP', // lang_get( 'relationship_added' )  $s_relationship_added = '新增相關';
    label: '新增相關',
  },
  [HistoryKeyEnum.BUG_DEL_RELATIONSHIP_19]: {
    id: HistoryKeyEnum.BUG_DEL_RELATIONSHIP_19,
    name: 'BUG_DEL_RELATIONSHIP', // lang_get( 'relationship_deleted' )  $s_relationship_deleted = '刪除相關';
    label: '刪除相關',
  },
  [HistoryKeyEnum.BUG_CLONED_TO_20]: {
    id: HistoryKeyEnum.BUG_CLONED_TO_20,
    name: 'BUG_CLONED_TO', // lang_get( 'bug_cloned_to' )  $s_bug_cloned_to = '複製到';
    label: '複製到',
  },
  [HistoryKeyEnum.BUG_CREATED_FROM_21]: {
    id: HistoryKeyEnum.BUG_CREATED_FROM_21,
    name: 'BUG_CREATED_FROM', // lang_get( 'bug_created_from' )  $s_bug_created_from = '由建立';
    label: '由建立',
  },
  [HistoryKeyEnum.BUG_REPLACE_RELATIONSHIP_23]: {
    id: HistoryKeyEnum.BUG_REPLACE_RELATIONSHIP_23,
    name: 'BUG_REPLACE_RELATIONSHIP', // lang_get( 'relationship_replaced' )  $s_relationship_replaced = '取代相關';
    label: '取代相關',
  },
  [HistoryKeyEnum.BUG_PAID_SPONSORSHIP_24]: {
    id: HistoryKeyEnum.BUG_PAID_SPONSORSHIP_24,
    name: 'BUG_PAID_SPONSORSHIP', // lang_get( 'sponsorship_paid' )  $s_sponsorship_paid = '支付贊助';
    label: '支付贊助',
  },
  [HistoryKeyEnum.TAG_ATTACHED_25]: {
    id: HistoryKeyEnum.TAG_ATTACHED_25,
    name: 'TAG_ATTACHED', // lang_get( 'tag_history_attached' )  $s_tag_history_attached = '附加標籤';
    label: '附加標籤',
  },
  [HistoryKeyEnum.TAG_DETACHED_26]: {
    id: HistoryKeyEnum.TAG_DETACHED_26,
    name: 'TAG_DETACHED', // lang_get( 'tag_history_detached' )  $s_tag_history_detached = '移除標籤';
    label: '移除標籤',
  },
  [HistoryKeyEnum.TAG_RENAMED_27]: {
    id: HistoryKeyEnum.TAG_RENAMED_27,
    name: 'TAG_RENAMED', // lang_get( 'tag_history_renamed' )  $s_tag_history_renamed = '重新命名標籤';
    label: '重新命名標籤',
  },
  [HistoryKeyEnum.BUG_REVISION_DROPPED_28]: {
    id: HistoryKeyEnum.BUG_REVISION_DROPPED_28,
    name: 'BUG_REVISION_DROPPED', // lang_get( 'bug_revision_dropped_history' )  $s_bug_revision_dropped_history = '版本刪除';
    label: '版本刪除',
  },
  [HistoryKeyEnum.BUGNOTE_REVISION_DROPPED_29]: {
    id: HistoryKeyEnum.BUGNOTE_REVISION_DROPPED_29,
    name: 'BUGNOTE_REVISION_DROPPED', // lang_get( 'bugnote_revision_dropped_history' )  $s_bugnote_revision_dropped_history = '註解版本刪除';
    label: '註解版本刪除',
  },
  [HistoryKeyEnum.PLUGIN_HISTORY_100]: {
    id: HistoryKeyEnum.PLUGIN_HISTORY_100,
    name: 'PLUGIN_HISTORY', // lang_get( 'plugin_history' )  $s_plugin_history = '外掛歷程';
    label: '外掛歷程',
  },
};
export class HistoryNormal {
  id: string;
  code: string;
  name: string;
  label: string;
}
interface HistoryNormalType {
  [key: string]: HistoryNormal;
}
export const HistoryKeyNormalType = {
  category: 'category',
  status: 'status',
  severity: 'severity',
  reproducibility: 'reproducibility',
  resolution: 'resolution',
  priority: 'priority',
  eta: 'eta',
  view_state: 'view_state',
  projection: 'projection',
  sticky: 'sticky',
  project_id: 'project_id',
  handler_id: 'handler_id',
  reporter_id: 'reporter_id',
  version: 'version',
  fixed_in_version: 'fixed_in_version',
  target_version: 'target_version',
  date_submitted: 'date_submitted',
  last_updated: 'last_updated',
  os: 'os',
  os_build: 'os_build',
  build: 'build',
  platform: 'platform',
  summary: 'summary',
  duplicate_id: 'duplicate_id',
  sponsorship_total: 'sponsorship_total',
  due_date: 'due_date',
};

// HistoryKeyEnum.NORMAL_TYPE_0: 0,
// https://github.com/mantisbt/mantisbt/blob/master/core/history_api.php#L544
export const HistoryNormalType: Readonly<HistoryNormalType> = {
  [HistoryKeyNormalType.category]: {
    id: HistoryKeyNormalType.category,
    code: 'category',
    name: 'category',
    label: '類別',
  },
  [HistoryKeyNormalType.status]: {
    id: HistoryKeyNormalType.status,
    code: 'status',
    name: 'status',
    label: '狀態',
  },
  [HistoryKeyNormalType.severity]: {
    id: HistoryKeyNormalType.severity,
    code: 'severity',
    name: 'severity',
    label: '嚴重性',
  },
  [HistoryKeyNormalType.reproducibility]: {
    id: HistoryKeyNormalType.reproducibility,
    code: 'reproducibility',
    name: 'reproducibility',
    label: '重現性',
  },
  [HistoryKeyNormalType.resolution]: {
    id: HistoryKeyNormalType.resolution,
    code: 'resolution',
    name: 'resolution',
    label: '解決方案',
  },
  [HistoryKeyNormalType.priority]: {
    id: HistoryKeyNormalType.priority,
    code: 'priority',
    name: 'priority',
    label: '優先度',
  },
  [HistoryKeyNormalType.eta]: {
    id: HistoryKeyNormalType.eta,
    code: 'eta',
    name: 'eta',
    label: 'ETA',
  },
  [HistoryKeyNormalType.view_state]: {
    id: HistoryKeyNormalType.view_state,
    code: 'viewState',
    name: 'view_state',
    label: '檢視狀態',
  },
  [HistoryKeyNormalType.projection]: {
    id: HistoryKeyNormalType.projection,
    code: 'projection',
    name: 'projection',
    label: '預測',
  },
  [HistoryKeyNormalType.sticky]: {
    id: HistoryKeyNormalType.sticky,
    code: 'sticky',
    name: 'sticky_issue',
    label: '置頂問題',
  },
  [HistoryKeyNormalType.project_id]: {
    id: HistoryKeyNormalType.project_id,
    code: 'projectId',
    name: 'email_project',
    label: '專案',
  },
  [HistoryKeyNormalType.handler_id]: {
    id: HistoryKeyNormalType.handler_id,
    code: 'handlerId',
    name: 'assigned_to',
    label: '指派給',
  },
  [HistoryKeyNormalType.reporter_id]: {
    id: HistoryKeyNormalType.reporter_id,
    code: 'reporterId',
    name: 'reporter',
    label: '報告人',
  },
  [HistoryKeyNormalType.version]: {
    id: HistoryKeyNormalType.version,
    code: 'version',
    name: 'product_version',
    label: '產品版本',
  },
  [HistoryKeyNormalType.fixed_in_version]: {
    id: HistoryKeyNormalType.fixed_in_version,
    code: 'fixedInVersion',
    name: 'fixed_in_version',
    label: '修復版本',
  },
  [HistoryKeyNormalType.target_version]: {
    id: HistoryKeyNormalType.target_version,
    code: 'targetVersion',
    name: 'target_version',
    label: '目標版本',
  },
  [HistoryKeyNormalType.date_submitted]: {
    id: HistoryKeyNormalType.date_submitted,
    code: 'dateSubmitted',
    name: 'date_submitted',
    label: '提交日期',
  },
  [HistoryKeyNormalType.last_updated]: {
    id: HistoryKeyNormalType.last_updated,
    code: 'lastUpdated',
    name: 'last_update',
    label: '最後更新',
  },
  [HistoryKeyNormalType.os]: {
    id: HistoryKeyNormalType.os,
    code: 'os',
    name: 'os',
    label: '作業系統',
  },
  [HistoryKeyNormalType.os_build]: {
    id: HistoryKeyNormalType.os_build,
    code: 'osBuild',
    name: 'os_build',
    label: '作業系統版本',
  },
  [HistoryKeyNormalType.build]: {
    id: HistoryKeyNormalType.build,
    code: 'build',
    name: 'build',
    label: '建置',
  },
  [HistoryKeyNormalType.platform]: {
    id: HistoryKeyNormalType.platform,
    code: 'platform',
    name: 'platform',
    label: '平台',
  },
  [HistoryKeyNormalType.summary]: {
    id: HistoryKeyNormalType.summary,
    code: 'summary',
    name: 'summary',
    label: '摘要',
  },
  [HistoryKeyNormalType.duplicate_id]: {
    id: HistoryKeyNormalType.duplicate_id,
    code: 'duplicateId',
    name: 'duplicate_id',
    label: '重複 ID',
  },
  [HistoryKeyNormalType.sponsorship_total]: {
    id: HistoryKeyNormalType.sponsorship_total,
    code: 'sponsorshipTotal',
    name: 'sponsorship_total',
    label: '贊助總額',
  },
  [HistoryKeyNormalType.due_date]: {
    id: HistoryKeyNormalType.due_date,
    code: 'dueDate',
    name: 'due_date',
    label: '到期日',
  },
};
