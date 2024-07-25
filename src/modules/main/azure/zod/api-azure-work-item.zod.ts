import { z } from 'zod';
import { twDayjs } from '../../../../utils/dayjs/dayjs';

//{
//     "id": 66581,
//     "rev": 22,
//     "fields": {
//       "System.AreaPath": "RD-ProjectWorkItem\\社區管理版",
//       "System.TeamProject": "RD-ProjectWorkItem",
//       "System.IterationPath": "RD-ProjectWorkItem\\社區管理版\\Sprint_41_42_2023",
//       "System.WorkItemType": "Product Backlog Item",
//       "System.State": "Done",
//       "System.Reason": "Moved out of state In Staging Test",
//       "System.AssignedTo": {
//         "displayName": "詹育穎",
//         "url": "https://spsprodsea1.vssps.visualstudio.com/Ad3c7a4b9-51a9-41c8-a0f0-1c27243ee6e2/_apis/Identities/88567574-ec3f-66f4-b4df-22349753cf9e",
//         "_links": {
//           "avatar": {
//             "href": "https://dev.azure.com/KingnetRD/_apis/GraphProfile/MemberAvatars/msa.ODg1Njc1NzQtZWMzZi03NmY0LWI0ZGYtMjIzNDk3NTNjZjll"
//           }
//         },
//         "id": "88567574-ec3f-66f4-b4df-22349753cf9e",
//         "uniqueName": "harold.jhan@smartdaily.com.tw",
//         "imageUrl": "https://dev.azure.com/KingnetRD/_apis/GraphProfile/MemberAvatars/msa.ODg1Njc1NzQtZWMzZi03NmY0LWI0ZGYtMjIzNDk3NTNjZjll",
//         "descriptor": "msa.ODg1Njc1NzQtZWMzZi03NmY0LWI0ZGYtMjIzNDk3NTNjZjll"
//       },
//       "System.CreatedDate": "2023-09-07T03:43:48.46Z",
//       "System.CreatedBy": {
//         "displayName": "吳政達",
//         "url": "https://spsprodsea1.vssps.visualstudio.com/Ad3c7a4b9-51a9-41c8-a0f0-1c27243ee6e2/_apis/Identities/b6cb60c8-e9bb-6e46-bb33-844af8f0c7fb",
//         "_links": {
//           "avatar": {
//             "href": "https://dev.azure.com/KingnetRD/_apis/GraphProfile/MemberAvatars/msa.YjZjYjYwYzgtZTliYi03ZTQ2LWJiMzMtODQ0YWY4ZjBjN2Zi"
//           }
//         },
//         "id": "b6cb60c8-e9bb-6e46-bb33-844af8f0c7fb",
//         "uniqueName": "darzz.wu@smartdaily.com.tw",
//         "imageUrl": "https://dev.azure.com/KingnetRD/_apis/GraphProfile/MemberAvatars/msa.YjZjYjYwYzgtZTliYi03ZTQ2LWJiMzMtODQ0YWY4ZjBjN2Zi",
//         "descriptor": "msa.YjZjYjYwYzgtZTliYi03ZTQ2LWJiMzMtODQ0YWY4ZjBjN2Zi"
//       },
//       "System.ChangedDate": "2023-10-31T06:27:45.23Z",
//       "System.ChangedBy": {
//         "displayName": "詹育穎",
//         "url": "https://spsprodsea1.vssps.visualstudio.com/Ad3c7a4b9-51a9-41c8-a0f0-1c27243ee6e2/_apis/Identities/88567574-ec3f-66f4-b4df-22349753cf9e",
//         "_links": {
//           "avatar": {
//             "href": "https://dev.azure.com/KingnetRD/_apis/GraphProfile/MemberAvatars/msa.ODg1Njc1NzQtZWMzZi03NmY0LWI0ZGYtMjIzNDk3NTNjZjll"
//           }
//         },
//         "id": "88567574-ec3f-66f4-b4df-22349753cf9e",
//         "uniqueName": "harold.jhan@smartdaily.com.tw",
//         "imageUrl": "https://dev.azure.com/KingnetRD/_apis/GraphProfile/MemberAvatars/msa.ODg1Njc1NzQtZWMzZi03NmY0LWI0ZGYtMjIzNDk3NTNjZjll",
//         "descriptor": "msa.ODg1Njc1NzQtZWMzZi03NmY0LWI0ZGYtMjIzNDk3NTNjZjll"
//       },
//       "System.CommentCount": 0,
//       "System.Title": "[FE] 身為 RD，可以更新電子看板的 logo，以利統一企業識別",
//       "System.BoardColumn": "Closed",
//       "System.BoardColumnDone": false,
//       "Microsoft.VSTS.Common.StateChangeDate": "2023-10-27T11:26:42.627Z",
//       "Microsoft.VSTS.Common.ActivatedDate": "2023-09-28T09:11:07.59Z",
//       "Microsoft.VSTS.Common.ActivatedBy": {
//         "displayName": "詹育穎",
//         "url": "https://spsprodsea1.vssps.visualstudio.com/Ad3c7a4b9-51a9-41c8-a0f0-1c27243ee6e2/_apis/Identities/88567574-ec3f-66f4-b4df-22349753cf9e",
//         "_links": {
//           "avatar": {
//             "href": "https://dev.azure.com/KingnetRD/_apis/GraphProfile/MemberAvatars/msa.ODg1Njc1NzQtZWMzZi03NmY0LWI0ZGYtMjIzNDk3NTNjZjll"
//           }
//         },
//         "id": "88567574-ec3f-66f4-b4df-22349753cf9e",
//         "uniqueName": "harold.jhan@smartdaily.com.tw",
//         "imageUrl": "https://dev.azure.com/KingnetRD/_apis/GraphProfile/MemberAvatars/msa.ODg1Njc1NzQtZWMzZi03NmY0LWI0ZGYtMjIzNDk3NTNjZjll",
//         "descriptor": "msa.ODg1Njc1NzQtZWMzZi03NmY0LWI0ZGYtMjIzNDk3NTNjZjll"
//       },
//       "Microsoft.VSTS.Common.ClosedDate": "2023-10-27T11:26:42.627Z",
//       "Microsoft.VSTS.Common.ClosedBy": {
//         "displayName": "吳政達",
//         "url": "https://spsprodsea1.vssps.visualstudio.com/Ad3c7a4b9-51a9-41c8-a0f0-1c27243ee6e2/_apis/Identities/b6cb60c8-e9bb-6e46-bb33-844af8f0c7fb",
//         "_links": {
//           "avatar": {
//             "href": "https://dev.azure.com/KingnetRD/_apis/GraphProfile/MemberAvatars/msa.YjZjYjYwYzgtZTliYi03ZTQ2LWJiMzMtODQ0YWY4ZjBjN2Zi"
//           }
//         },
//         "id": "b6cb60c8-e9bb-6e46-bb33-844af8f0c7fb",
//         "uniqueName": "darzz.wu@smartdaily.com.tw",
//         "imageUrl": "https://dev.azure.com/KingnetRD/_apis/GraphProfile/MemberAvatars/msa.YjZjYjYwYzgtZTliYi03ZTQ2LWJiMzMtODQ0YWY4ZjBjN2Zi",
//         "descriptor": "msa.YjZjYjYwYzgtZTliYi03ZTQ2LWJiMzMtODQ0YWY4ZjBjN2Zi"
//       },
//       "Microsoft.VSTS.Common.Priority": 0,
//       "Microsoft.VSTS.Common.ValueArea": "Business",
//       "Microsoft.VSTS.Scheduling.TargetDate": "2023-10-17T16:00:00Z",
//       "Microsoft.VSTS.Common.BacklogPriority": 1999989967,
//       "Custom.SyncToJira": false,
//       "Custom.63e8fb7d-c541-4e49-ba9a-82715a959f4d": "https://kingnetrd.visualstudio.com/RD-ProjectWorkItem/_wiki/wikis/RD-ProjectWorkItem.wiki/788/%E5%85%AC%E5%8F%B8%E5%93%81%E7%89%8C-%E5%AE%89%E5%BF%83%EF%BC%8C%E4%BE%BF%E5%88%A9%EF%BC%8C%E5%B0%8A%E6%A6%AE",
//       "WEF_C006E546B620448E8F7334B3161CD85A_Kanban.Column": "Closed",
//       "WEF_C006E546B620448E8F7334B3161CD85A_Kanban.Column.Done": false,
//       "System.Description": "<ul> <li>標題： </li> <li>前端/後端工作項目描述： <ol> <li><br> <ul> <li>&nbsp; </li> </ul> </li> <li><br> <ul> <li>&nbsp; </li> </ul> </li> </ol> </li> </ul>",
//       "Custom.161afd1d-195b-43ac-bb0e-453e7cf2a740": "<ul> <li>方案核心：<br>敘述內容... <ul> <li>&nbsp; </li> </ul> </li> <li>方案要點：<br>敘述內容... </li> </ul>",
//       "Custom.bd40e14c-4c25-4e02-893d-a7c8561e83a3": "<ul> <li>專案名稱：<br> <ul> <li>目標版本： </li> <li>基底版本： </li> </ul> </li> </ul>",
//       "Custom.d7e7f405-bb43-4ded-b53e-89c1ef82c7f1": "<p>　　[v]&nbsp;需求未定案<br>　　[]&nbsp;需求討論/確認中<br>　　[]&nbsp;需求已提交初版<br>　　[]&nbsp;需求初版後仍調整中<br>　　[]&nbsp;需求已定案 </p>",
//       "Custom.3c794236-fc2b-4a0c-b360-2f1ee3de7574": "<ul> <li> <p>本專案需求進度如有修改或是錯誤，煩請聯絡 ○○，謝謝。 </p> </li> </ul>",
//       "Custom.4e6f2406-edc5-4f56-874c-69643844e45b": "<ul> <li>&nbsp; </li> </ul>",
//       "Custom.99658c28-f6d7-4a12-af26-bac6898617b2": "<ul> <li>&nbsp; </li> </ul>"
//     },
//     "_links": {
//       "self": {
//         "href": "https://dev.azure.com/KingnetRD/74c89a4b-5ccb-4be0-b299-930b967545cd/_apis/wit/workItems/66581"
//       },
//       "workItemUpdates": {
//         "href": "https://dev.azure.com/KingnetRD/74c89a4b-5ccb-4be0-b299-930b967545cd/_apis/wit/workItems/66581/updates"
//       },
//       "workItemRevisions": {
//         "href": "https://dev.azure.com/KingnetRD/74c89a4b-5ccb-4be0-b299-930b967545cd/_apis/wit/workItems/66581/revisions"
//       },
//       "workItemComments": {
//         "href": "https://dev.azure.com/KingnetRD/74c89a4b-5ccb-4be0-b299-930b967545cd/_apis/wit/workItems/66581/comments"
//       },
//       "html": {
//         "href": "https://dev.azure.com/KingnetRD/74c89a4b-5ccb-4be0-b299-930b967545cd/_workitems/edit/66581"
//       },
//       "workItemType": {
//         "href": "https://dev.azure.com/KingnetRD/74c89a4b-5ccb-4be0-b299-930b967545cd/_apis/wit/workItemTypes/Product%20Backlog%20Item"
//       },
//       "fields": {
//         "href": "https://dev.azure.com/KingnetRD/74c89a4b-5ccb-4be0-b299-930b967545cd/_apis/wit/fields"
//       }
//     },
//     "url": "https://dev.azure.com/KingnetRD/74c89a4b-5ccb-4be0-b299-930b967545cd/_apis/wit/workItems/66581"
//   }
const AzureWorkItemCustomColumnZod = z.coerce.string().nullable().default('');

const AzureWorkItemUserZod = z
  .object({
    displayName: z.coerce.string().default(''),
    url: z.coerce.string().default(''),
    _links: z
      .object({
        avatar: z.object({
          href: z.coerce.string().default(''),
        }),
      })
      .default({}),
    id: z.coerce.string().default(''),
    uniqueName: z.coerce.string().default(''),
    imageUrl: z.coerce.string().default(''),
    descriptor: z.coerce.string().default(''),
  })
  .optional()
  .default({})
  .transform((obj) => {
    return {
      displayName: obj.displayName,
      url: obj.url,
      avatar: obj._links.avatar.href,
      id: obj.id,
      uniqueName: obj.uniqueName,
      imageUrl: obj.imageUrl,
      descriptor: obj.descriptor,
    };
  });

type AzureWorkItemUserZodType = z.infer<typeof AzureWorkItemUserZod>;

const AzureWorkItemLinksZod = z
  .object({
    self: z
      .object({
        href: z.coerce.string().default(''),
      })
      .default({}),
    workItemUpdates: z
      .object({
        href: z.coerce.string().default(''),
      })
      .default({}),
    workItemRevisions: z
      .object({
        href: z.coerce.string().default(''),
      })
      .default({}),
    workItemComments: z
      .object({
        href: z.coerce.string().default(''),
      })
      .default({}),
    html: z
      .object({
        href: z.coerce.string().default(''),
      })
      .default({}),
    workItemType: z
      .object({
        href: z.coerce.string().default(''),
      })
      .default({}),
    fields: z
      .object({
        href: z.coerce.string().default(''),
      })
      .default({}),
  })
  .default({})
  .transform((obj) => {
    return {
      self: obj.self.href,
      workItemUpdates: obj.workItemUpdates.href,
      workItemRevisions: obj.workItemRevisions.href,
      workItemComments: obj.workItemComments.href,
      html: obj.html.href,
      workItemType: obj.workItemType.href,
      fields: obj.fields.href,
    };
  });

export const ApiAzureWorkItemZod = z
  .object({
    id: z.coerce.number().default(0),
    org: z.coerce.string().default(''), // extra
    project: z.coerce.string().default(''), // extra
    rev: z.coerce.number().default(0),
    fields: z.object({
      'System.AreaPath': z.coerce.string().default(''),
      'System.TeamProject': z.coerce.string().default(''),
      'System.IterationPath': z.coerce.string().default(''),
      'System.WorkItemType': z.coerce.string().default(''),
      'System.State': z.coerce.string().default(''),
      'System.Reason': z.coerce.string().default(''),
      'System.AssignedTo': AzureWorkItemUserZod.optional(),
      'System.CreatedDate': z.coerce.string().default(''),
      'System.CreatedBy': AzureWorkItemUserZod.optional(),
      'System.ChangedDate': z.coerce.string().default('').optional(),
      'System.ChangedBy': AzureWorkItemUserZod.optional(),
      'System.CommentCount': z.coerce.number().default(0),
      'System.Title': z.coerce.string().default(''),
      'System.BoardColumn': z.coerce.string().default(''),
      'System.BoardColumnDone': z.coerce.boolean().default(false),
      'Microsoft.VSTS.Common.StateChangeDate': z.coerce
        .string()
        .default('')
        .optional(),
      'Microsoft.VSTS.Common.ActivatedDate': z.coerce
        .string()
        .default('')
        .optional(),
      'Microsoft.VSTS.Common.ActivatedBy': AzureWorkItemUserZod.optional(),
      'Microsoft.VSTS.Common.ClosedDate': z.coerce
        .string()
        .default('')
        .optional(),
      'Microsoft.VSTS.Common.ClosedBy': AzureWorkItemUserZod.optional(),
      'Microsoft.VSTS.Common.Priority': z.coerce.number().default(0),
      'Microsoft.VSTS.Common.ValueArea': z.coerce.string().default(''),
      'Microsoft.VSTS.Scheduling.TargetDate': z.coerce.string().default(''),
      'Microsoft.VSTS.Common.BacklogPriority': z.coerce.number().default(0),
      'Custom.SyncToJira': z.coerce.boolean().default(false),
      'Custom.63e8fb7d-c541-4e49-ba9a-82715a959f4d':
        AzureWorkItemCustomColumnZod,
      'WEF_C006E546B620448E8F7334B3161CD85A_Kanban.Column':
        AzureWorkItemCustomColumnZod,
      'WEF_C006E546B620448E8F7334B3161CD85A_Kanban.Column.Done': z.coerce
        .boolean()
        .nullable()
        .default(false),
      'System.Description': z.coerce.string().default(''),
    }),
    _links: AzureWorkItemLinksZod,
    url: z.coerce.string().default(''),
  })
  .default({})
  .transform((obj) => {
    return {
      id: obj.id,
      rev: obj.rev,
      org: obj?.org, // extra
      project: obj?.project, // extra
      fields: {
        path: obj.fields['System.AreaPath'],
        teamProject: obj.fields['System.TeamProject'],
        iterationPath: obj.fields['System.IterationPath'],
        workItemType: obj.fields['System.WorkItemType'],
        state: obj.fields['System.State'],
        reason: obj.fields['System.Reason'],
        assignedTo: obj.fields['System.AssignedTo'] as AzureWorkItemUserZodType,
        createdDate: twDayjs(obj.fields['System.CreatedDate']).format(),
        createdBy: obj.fields['System.CreatedBy'] as AzureWorkItemUserZodType,
        changedDate: twDayjs(obj.fields['System.ChangedDate']).format(),
        changedBy: obj.fields['System.ChangedBy'] as AzureWorkItemUserZodType,
        commentCount: obj.fields['System.CommentCount'],
        title: obj.fields['System.Title'],
        boardColumn: obj.fields['System.BoardColumn'],
        boardColumnDone: obj.fields['System.BoardColumnDone'],
        stateChangeDate: twDayjs(
          obj.fields['Microsoft.VSTS.Common.StateChangeDate'],
        ).format(),
        activatedDate: twDayjs(
          obj.fields['Microsoft.VSTS.Common.ActivatedDate'],
        ).format(),
        activatedBy: obj.fields[
          'Microsoft.VSTS.Common.ActivatedBy'
        ] as AzureWorkItemUserZodType,
        closedDate: twDayjs(
          obj.fields['Microsoft.VSTS.Common.ClosedDate'],
        ).format(),
        closedBy: obj.fields[
          'Microsoft.VSTS.Common.ClosedBy'
        ] as AzureWorkItemUserZodType,
        priority: obj.fields['Microsoft.VSTS.Common.Priority'],
        valueArea: obj.fields['Microsoft.VSTS.Common.ValueArea'],
        targetDate: twDayjs(
          obj.fields['Microsoft.VSTS.Scheduling.TargetDate'],
        ).format(),
        backlogPriority: obj.fields['Microsoft.VSTS.Common.BacklogPriority'],
        syncToJira: obj.fields['Custom.SyncToJira'],
        syncToJiraURL:
          obj.fields['Custom.63e8fb7d-c541-4e49-ba9a-82715a959f4d'],
        kanbanColumn:
          obj.fields['WEF_C006E546B620448E8F7334B3161CD85A_Kanban.Column'],
        kanbanColumnDone:
          obj.fields['WEF_C006E546B620448E8F7334B3161CD85A_Kanban.Column.Done'],
        description: obj.fields['System.Description'],
      },
      links: obj._links,
      url: obj.url,
    };
  })
  .transform((obj) => {
    return {
      id: obj.id,
      rev: obj.rev,
      org: obj.org, // extra
      project: obj.project, // extra
      state: obj.fields.state,
      path: obj.fields.path,
      teamProject: obj.fields.teamProject,
      iterationPath: obj.fields.iterationPath,
      reason: obj.fields.reason,
      workItemType: obj.fields.workItemType,
      link: obj.links.html,
      url: obj.url,
      title: obj.fields.title,
      description: obj.fields.description,
      commentCount: obj.fields.commentCount,
      assignedTo: obj.fields.assignedTo
        ? {
            name: obj.fields.assignedTo.displayName,
            email: obj.fields.assignedTo.uniqueName,
          }
        : null,
      createdDate: obj.fields.createdDate,
      createdBy: obj.fields.createdBy
        ? {
            name: obj.fields.createdBy.displayName,
            email: obj.fields.createdBy.uniqueName,
          }
        : null,
      changedDate: obj.fields.changedDate,
      changedBy: obj.fields.changedBy
        ? {
            name: obj.fields.changedBy?.displayName,
            email: obj.fields.changedBy?.uniqueName,
          }
        : null,
      stateChangeDate: obj.fields.stateChangeDate,
      targetDate: obj.fields.targetDate,
      priority: obj.fields.priority,
      boardColumn: obj.fields.boardColumn,
      boardColumnDone: obj.fields.boardColumnDone,
      activatedDate: obj.fields.activatedDate,
      activatedBy: obj.fields.activatedBy
        ? {
            name: obj.fields.activatedBy?.displayName,
            email: obj.fields.activatedBy?.uniqueName,
          }
        : null,
      closedDate: obj.fields.closedDate,
      closedBy: obj.fields.closedBy
        ? {
            name: obj.fields.closedBy?.displayName,
            email: obj.fields.closedBy?.uniqueName,
          }
        : null,
    };
  });

export type ApiAzureWorkItemZodType = z.infer<typeof ApiAzureWorkItemZod>;
