import { z } from 'zod';
import { twDayjs } from '../../../../utils/dayjs/dayjs';
//{
//   "uuid": "88fc4433-a357-4179-b76a-b071641e4bf7",
//   "bugId": null,
//   "status": {
//     "id": 10,
//     "name": "new",
//     "label": "新問題",
//     "value": 10
//   },
//   "subject": "主題你好",
//   "project": {
//     "id": 1,
//     "code": "P01",
//     "name": "管理版Web",
//     "enabled": true,
//     "isPublic": true,
//     "handlerRoleId": null,
//     "platform": "智生活",
//     "product": "管理版",
//     "service": "WEB",
//     "order": 1,
//     "serviceTargetType": {
//       "id": 1,
//       "name": "apartmentComplex",
//       "label": "社區"
//     },
//     "value": 1,
//     "label": "管理版Web"
//   },
//   "handlerType": {
//     "id": "ROLE",
//     "name": "Role",
//     "label": "角色",
//     "value": "ROLE"
//   },
//   "handler": {
//     "id": "1",
//     "name": "品質保證工程師",
//     "code": "QA001",
//     "disable": false,
//     "value": "1",
//     "label": "品質保證工程師 / QA001"
//   },
//  "descTextarea": {
//     "ops": [
//       {
//         "insert": {
//           "image": "https://storage.googleapis.com/knst-bugtracker/development%2Fuploads%2FSjHIwgm3veeVE3jbFcdta.jpg"
//         }
//       },
//       {
//         "insert": "\n"
//       },
//       {
//         "attributes": {
//           "background": "#ffffff",
//           "color": "#232a31"
//         },
//         "insert": "[周刊王CTWANT] 漲電價箭在弦上，用電大戶費率將大幅調高，商總主席賴正鎰表示，如大戶電價漲幅超過10％，甚至達到15％，觀光旅館房價每晚恐怕調漲500到1000元；觀光旅館公會也指出，電價調整應會於明年反映在房價上。"
//       },
//       {
//         "insert": "\n"
//       },
//       {
//         "attributes": {
//           "background": "#ffffff",
//           "color": "#232a31"
//         },
//         "insert": "外界預測4月調整電價，1000度以上用電戶面臨10％漲幅，將使夏月電費最高級距首次突破"
//       },
//       {
//         "attributes": {
//           "background": "#ffffff",
//           "color": "#232a31",
//           "bold": true
//         },
//         "insert": "每度8元"
//       },
//       {
//         "attributes": {
//           "background": "#ffffff",
//           "color": "#232a31"
//         },
//         "insert": "，台電表示電價尊重審議會審議，尚未定案，但強調據過往經驗，對1001度以上用戶的電價調漲可顯著促進節電效益。以住宅為例，近2次電價調整，僅調漲高級距用電單價，其中2022年7月調漲每月用電超過1000度部分，致當年8至12月住宅1000度以上用電減少1.6億度，占同期整體減少的用電量25％。"
//       },
//       {
//         "insert": "\n"
//       }
//     ]
//   }
//  "infoTextarea": {
//     "ops": [
//       {
//         "attributes": {
//           "background": "#ffffff",
//           "color": "#232a31"
//         },
//         "insert": "國內電價1年檢討2次，若確定調整，新制會在4月及10月上路。行政院長陳建仁17日指出，俄烏戰爭後，燃料價格大漲，各國大幅度調整電價，台電為穩定民生作出調整，調幅低於其他國家。陳建仁表示，電價調整有審議機制，近日審議委員會工作小組已展開討論，會在穩定物價、供電充足中調整，細緻研議民生電價、大小商店，及不同企業的電價，做到不影響物價、家戶負擔得起，企業也能充分發展，使電價調整更加合理，會要求電價審議委員做出努力。"
//       },
//       {
//         "insert": "\n"
//       }
//     ]
//   },
//   "priority": {
//     "id": 30,
//     "name": "normal",
//     "label": "一般",
//     "value": 30
//   },
//   "reproducibility": {
//     "id": 30,
//     "name": "sometimes",
//     "label": "時常",
//     "value": 30
//   },
//   "category": {
//     "id": 1,
//     "name": "普通",
//     "value": 1,
//     "label": "普通"
//   },
//   "serviceTarget": {
//     "id": 2,
//     "code": "15111901",
//     "name": "惠宇桂冠",
//     "city": "臺中市",
//     "dist": "北區",
//     "value": 2,
//     "label": "惠宇桂冠 / 臺中市"
//   },
//   "projectFunction": {
//     "id": 12,
//     "name": "推播通知",
//     "projectId": 1,
//     "code": "P01-F012",
//     "value": 12,
//     "label": "推播通知"
//   },
//   "currentVersion": "1.0.0",
//   "device": "手機",
//   "deviceVersion": "2.0.0",
//   "tags": [
//     {
//       "label": "收集中",
//       "default": true
//     }
//   ],
//   "azureURL": "https://tw.yahoo.com",
//   azure: {
//     id: 75769,
//     org: 'kingnetrd',
//     project: 'RD-ProjectWorkItem',
//     state: 'New',
//     url: 'https://dev.azure.com/KingnetRD/74c89a4b-5ccb-4be0-b299-930b967545cd/_workitems/edit/75769',
//     assignedToName: '陳映捷',
//     assignedToEmail: 'yingjie.chen@smartdaily.com.tw',
//     createdDate: '2024年03月12日 中午 11:20',
//     createdByName: '張雅勛',
//     createdByEmail: 'ruby.jhang@smartdaily.com.tw',
//     changedDate: '2024年03月18日 晚上 6:06',
//     changedByName: '廖耿誼',
//     changedByEmail: 'jimmy.liao@smartdaily.com.tw',
//     expiredAt: '2024年03月18日 晚上 10:50',
//     updatedAt: '2024年03月18日 晚上 10:20',
//     complete: false,
//     name: '[其他]與其他平台的工作項目',
//     label: '[其他]與其他平台的工作項目'
//   },
//   "targetVersion": "1.2.0",
//   "severity": {
//     "id": 50,
//     "name": "minor",
//     "label": "次要",
//     "value": 50
//   },
//   "deadline": "2024/03/06",
//   "platform": "智生活",
//   "product": "管理版",
//   "service": "WEB",
//   "files": [
//     {
//       "id": "9Jdvf-TU-dzqzXeW7Rwro",
//       "originalName": "Xnip2024-03-13_11-01-17.jpg",
//       "filename": "9Jdvf-TU-dzqzXeW7Rwro.jpg",
//       "contentType": "image/jpeg",
//       "size": 172941,
//       "url": "https://storage.googleapis.com/knst-bugtracker/development/uploads/9Jdvf-TU-dzqzXeW7Rwro.jpg",
//       "fileSize": "168.89 KB",
//       "createdAt": "2024年03月13日 下午 3:17"
//     }
//   ],
//   "relationLinks": [
//     {
//       "id": 2,
//       "uuid": "4624f2bc-2d7a-4a67-b88e-e0ffd4bc100a",
//       "label": "#000002",
//       "status": "已分配",
//       "project": "管理版Web",
//       "title": "新北三峽農場茶園白茫茫 睽違8年再飄雪002",
//       "createdAt": "2024年01月23日 下午 3:01",
//       "link": "/bug/2"
//     }
//   ]
// }

export const BugTrackerFormDataZod = z
  .object({
    uuid: z.coerce.string().default(''),
    bugID: z.coerce.string().nullable().default(null),
    status: z
      .object({
        id: z.coerce.number(),
        name: z.string(),
        label: z.string(),
        value: z.coerce.number(),
      })
      .nullable()
      .default({}),
    subject: z.coerce.string().default(''),
    project: z
      .object({
        id: z.coerce.number(),
        code: z.string(),
        name: z.string(),
        enabled: z.coerce.boolean(),
        isPublic: z.coerce.boolean(),
        handlerRoleId: z.coerce.number().nullable(),
        platform: z.string(),
        product: z.string(),
        service: z.string(),
        order: z.coerce.number(),
        serviceTargetType: z
          .object({
            id: z.coerce.number(),
            name: z.string(),
            label: z.string(),
          })
          .nullable(),
        value: z.coerce.number(),
        label: z.string(),
      })
      .nullable()
      .default({}),
    reporter: z
      .object({
        id: z.coerce.number().default(0),
        account: z.string().default(''),
        userName: z.string().default(''),
        mantisbtUserId: z.coerce.number().default(0),
        employee: z
          .object({
            id: z.coerce.number().default(0),
            code: z.coerce.number().default(0),
            employeeId: z.coerce.string().default(''),
            name: z.coerce.string().default(''),
          })
          .nullable()
          .default({}),
      })
      .default({}),
    handlerType: z
      .object({
        id: z.coerce.string(),
        name: z.string(),
        label: z.string(),
        value: z.coerce.string(),
      })
      .nullable()
      .default({}),
    handler: z
      .object({
        id: z.coerce.number().default(0),
        name: z.coerce.string(),
        code: z.coerce.string(),
        disable: z.coerce.boolean().default(false),
        value: z.coerce.string(),
        label: z.string(),
      })
      .nullable()
      .default({}),
    descTextarea: z.coerce.string().default(''),
    infoTextarea: z.coerce.string().default(''),
    priority: z
      .object({
        id: z.coerce.number().default(0),
        name: z.coerce.string().default(''),
        label: z.coerce.string().default(''),
        value: z.coerce.number().default(0),
      })
      .nullable()
      .default({}),
    reproducibility: z
      .object({
        id: z.coerce.number().default(0),
        name: z.coerce.string().default(''),
        label: z.coerce.string().default(''),
        value: z.coerce.number().default(0),
      })
      .nullable()
      .default({}),
    category: z
      .object({
        id: z.coerce.number().default(0),
        name: z.coerce.string().default(''),
        value: z.coerce.number().default(0),
        label: z.coerce.string().default(''),
      })
      .nullable()
      .default({}),
    serviceTarget: z
      .object({
        id: z.coerce.number().default(0),
        code: z.coerce.string().default(''),
        label: z.coerce.string().default(''),
        value: z.coerce.number().nullable().default(null),
      })
      .nullable()
      .default({}),
    projectFunction: z
      .object({
        id: z.coerce.number().default(0),
        name: z.coerce.string().default(''),
        label: z.coerce.string().default(''),
        value: z.coerce.number().default(0),
      })
      .nullable()
      .default({}),
    device: z.coerce.string().default(''),
    deviceVersion: z.coerce.string().default(''),
    tags: z
      .array(
        z.object({
          label: z.string(),
          default: z.coerce.boolean(),
        }),
      )
      .nullable()
      .default([]),
    azureURL: z.coerce.string().default(''),
    azure: z.object({
      id: z.coerce.number().default(0),
      org: z.coerce.string().default(''),
      project: z.coerce.string().default(''),
      state: z.coerce.string().default(''),
      url: z.coerce.string().default(''),
      assignedToName: z.coerce.string().default(''),
      assignedToEmail: z.coerce.string().default(''),
      createdDate: z.coerce.string().default(''),
      createdByName: z.coerce.string().default(''),
      createdByEmail: z.coerce.string().default(''),
      changedDate: z.coerce.string().default(''),
      changedByName: z.coerce.string().default(''),
      changedByEmail: z.coerce.string().default(''),
      expiredAt: z.coerce.string().default(''),
      updatedAt: z.coerce.string().default(''),
      complete: z.coerce.boolean().default(false),
      name: z.coerce.string().default(''),
      label: z.coerce.string().default(''),
    }),
    version: z.coerce.string().default(''),
    targetVersion: z.coerce.string().default(''),
    severity: z
      .object({
        id: z.coerce.number().default(0),
        name: z.coerce.string().default(''),
        label: z.coerce.string().default(''),
        value: z.coerce.number().default(0),
      })
      .nullable(),
    deadline: z.coerce.string().nullable().default(null),
    platform: z.coerce.string().default(''),
    product: z.coerce.string().default(''),
    service: z.coerce.string().default(''),
    files: z
      .array(
        z.object({
          id: z.coerce.string(),
          originalName: z.coerce.string(),
          filename: z.coerce.string(),
          contentType: z.coerce.string(),
          size: z.coerce.number(),
          url: z.coerce.string(),
          fileSize: z.coerce.string(),
          createdAt: z.coerce.string(),
        }),
      )
      .nullable()
      .default([]),
    relationLinks: z
      .array(
        z.object({
          id: z.coerce.number(),
          uuid: z.coerce.string(),
          label: z.coerce.string(),
          status: z.coerce.string(),
          project: z.coerce.string(),
          title: z.coerce.string(),
          createdAt: z.coerce.string(),
          link: z.coerce.string(),
        }),
      )
      .nullable()
      .default([]),
  })
  .default({})
  .transform((obj) => {
    return {
      uuid: obj.uuid,
      status: obj.status,
      subStatus: obj.status,
      subject: obj.subject,
      project: obj.project,
      reporter: obj.reporter,
      handlerType: obj.handlerType,
      handler: obj.handler,
      descTextarea: obj.descTextarea,
      infoTextarea: obj.infoTextarea,
      priority: obj.priority,
      reproducibility: obj.reproducibility,
      category: obj.category,
      serviceTargetType: obj.project.serviceTargetType,
      serviceTarget: obj.serviceTarget,
      projectFunction: obj.projectFunction,
      device: obj.device,
      deviceVersion: obj.deviceVersion,
      tags: obj.tags,
      azureURL: obj.azureURL,
      azure: obj.azure,
      version: obj.version,
      targetVersion: obj.targetVersion,
      severity: obj.severity,
      deadline: twDayjs(obj.deadline).toDate(),
      platform: obj.platform,
      product: obj.product,
      service: obj.service,
      files: obj.files,
      relationLinks: obj.relationLinks,
    };
  });

export type BugTrackerFormDataZodType = z.infer<typeof BugTrackerFormDataZod>;
