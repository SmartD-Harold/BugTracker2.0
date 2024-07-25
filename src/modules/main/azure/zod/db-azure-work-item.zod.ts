import { z } from 'zod';
//{
//         "id": 1,
//         "azureId": 66582,
//         "azureOrg": "kingnetrd",
//         "azureProject": "RD-ProjectWorkItem",
//         "rev": 25,
//         "areaPath": "RD-ProjectWorkItem\\社區管理版",
//         "teamProject": "RD-ProjectWorkItem",
//         "iterationPath": "RD-ProjectWorkItem\\社區管理版\\Sprint_41_42_2023",
//         "workItemType": "Product Backlog Item",
//         "state": "Done",
//         "reason": "Moved out of state In Staging Test",
//         "title": "[FE] 身為 RD，可以將廣告板位暫時改為日日和社區圖片，以符合當前需求",
//         "description": "<ul> <li>標題： </li> <li>前端/後端工作項目描述： <ol> <li><br> <ul> <li>&nbsp; </li> </ul> </li> <li><br> <ul> <li>&nbsp; </li> </ul> </li> </ol> </li> </ul>",
//         "commentCount": 1,
//         "assignedToName": "詹育穎",
//         "assignedToEmail": "harold.jhan@smartdaily.com.tw",
//         "createdDate": "2023-09-07T03:44:15.000Z",
//         "createdByName": "吳政達",
//         "createdByEmail": "darzz.wu@smartdaily.com.tw",
//         "changedDate": "2023-10-31T06:27:45.000Z",
//         "changedByName": "詹育穎",
//         "changedByEmail": "harold.jhan@smartdaily.com.tw",
//         "stateChangeDate": "2023-10-27T11:26:42.000Z",
//         "targetDate": "2023-10-17T16:00:00.000Z",
//         "priority": 0,
//         "boardColumn": "Closed",
//         "boardColumnDone": false,
//         "link": "https://dev.azure.com/KingnetRD/74c89a4b-5ccb-4be0-b299-930b967545cd/_workitems/edit/66582",
//         "url": "https://dev.azure.com/KingnetRD/74c89a4b-5ccb-4be0-b299-930b967545cd/_apis/wit/workItems/66582",
//         "activatedDate": "2023-10-03T01:31:38.000Z",
//         "activatedByName": "詹育穎",
//         "activatedByEmail": "harold.jhan@smartdaily.com.tw",
//         "closedDate": "2023-10-27T11:26:42.000Z",
//         "closedByName": "吳政達",
//         "closedByEmail": "darzz.wu@smartdaily.com.tw",
//         "sendApiUrl": "https://dev.azure.com/kingnetrd/RD-ProjectWorkItem/_apis/wit/workitems/66582?api-version=7.1-preview.3",
//         "sendApiMethod": "GET",
//         "expiredAt": "2024-03-15T16:08:59.355Z",
//         "createdAt": "2024-03-15T15:58:07.541Z",
//         "updatedAt": "2024-03-15T15:58:59.362Z"
//     }

export const DbAzureWorkItemZod = z
  .object({
    id: z.coerce.number().default(0),
    azureId: z.coerce.number().default(0),
    azureOrg: z.coerce.string().default(''),
    azureProject: z.coerce.string().default(''),
    rev: z.coerce.number().default(0),
    areaPath: z.coerce.string().default(''),
    teamProject: z.coerce.string().default(''),
    iterationPath: z.coerce.string().default(''),
    workItemType: z.coerce.string().default(''),
    state: z.coerce.string().default(''),
    reason: z.coerce.string().default(''),
    title: z.coerce.string().default(''),
    description: z.coerce.string().nullable().default(''),
    commentCount: z.coerce.number().default(0),
    assignedToName: z.coerce.string().nullable().default(''),
    assignedToEmail: z.coerce.string().nullable().default(''),
    createdDate: z.coerce.date().nullable().default(null),
    createdByName: z.coerce.string().nullable().default(''),
    createdByEmail: z.coerce.string().nullable().default(''),
    changedDate: z.coerce.date().nullable().default(null),
    changedByName: z.coerce.string().nullable().default(''),
    changedByEmail: z.coerce.string().nullable().default(''),
    stateChangeDate: z.coerce.date().nullable().default(null),
    targetDate: z.coerce.date().nullable().default(null),
    priority: z.coerce.number().default(0),
    boardColumn: z.coerce.string().default(''),
    boardColumnDone: z.boolean().default(false),
    link: z.coerce.string().default(''),
    url: z.coerce.string().default(''),
    activatedDate: z.coerce.date().nullable().default(null),
    activatedByName: z.coerce.string().nullable().default(''),
    activatedByEmail: z.coerce.string().nullable().default(''),
    closedDate: z.coerce.date().nullable().default(null),
    closedByName: z.coerce.string().nullable().default(''),
    closedByEmail: z.coerce.string().nullable().default(''),
    sendApiUrl: z.coerce.string().default(''),
    sendApiMethod: z.coerce.string().default(''),
    expiredAt: z.coerce.date().default(null),
    createdAt: z.coerce.date().default(null),
    updatedAt: z.coerce.date().default(null),
  })
  .default({})
  .transform((obj) => {
    return {
      id: obj.azureId,
      org: obj.azureOrg,
      project: obj.azureProject,
      state: obj.state,
      path: obj.areaPath,
      teamProject: obj.teamProject,
      iterationPath: obj.iterationPath,
      reason: obj.reason,
      workItemType: obj.workItemType,
      link: obj.link,
      url: obj.url,
      title: obj.title,
      description: obj.description,
      commentCount: obj.commentCount,
      assignedTo: obj.assignedToName
        ? {
            name: obj.assignedToName,
            email: obj.assignedToEmail,
          }
        : null,
      createdDate: obj.createdDate,
      createdBy: obj.createdByName
        ? {
            name: obj.createdByName,
            email: obj.createdByEmail,
          }
        : null,
      changedDate: obj.changedDate,
      changedBy: obj.changedByName
        ? {
            name: obj.changedByName,
            email: obj.changedByEmail,
          }
        : null,
      stateChangeDate: obj.stateChangeDate,
      targetDate: obj.targetDate,
      priority: obj.priority,
      boardColumn: obj.boardColumn,
      boardColumnDone: obj.boardColumnDone,
      activatedDate: obj.activatedDate,
      activatedBy: obj.activatedByName
        ? {
            name: obj.activatedByName,
            email: obj.activatedByEmail,
          }
        : null,
      closedDate: obj.closedDate,
      closedBy: obj.closedByName
        ? {
            name: obj.closedByName,
            email: obj.closedByEmail,
          }
        : null,
      expiredAt: obj.expiredAt,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    };
  });

export type DbAzureWorkItemType = z.infer<typeof DbAzureWorkItemZod>;
