import { z } from 'zod';
//{
//   uuid: '6c78d1f6-e6d9-4514-ae6e-abffe6598e1f',
//   bugID: null,
//   status: { id: 10, name: 'new', label: '新問題', value: 10 },
//   subject: '',
//   project: {
//     id: 1,
//     code: 'P01',
//     name: '管理版Web',
//     enabled: true,
//     isPublic: true,
//     handlerRoleId: null,
//     platform: '智生活',
//     product: '管理版',
//     service: 'WEB',
//     order: 1,
//     serviceTargetType: { id: 1, name: 'apartmentComplex', label: '社區' },
//     value: 1,
//     label: '管理版Web'
//   },
//   handlerType: { id: 'ROLE', name: 'Role', label: '角色', value: 'ROLE' },
//   handler: {
//     id: '1',
//     name: '品質保證工程師',
//     code: 'QA001',
//     disable: false,
//     value: '1',
//     label: '品質保證工程師 / QA001'
//   },
// report :{
//     id: 1,
//     account: aaa@gmail.com,
//     userName: harold,
//     mantisbtUserId: 1,
//     employee: {
//     },
// }
//   descTextarea: '',
//   infoTextarea: '',
//   priority: { id: 30, name: 'normal', label: '一般', value: 30 },
//   reproducibility: { id: 30, name: 'sometimes', label: '時常', value: 30 },
//   category: { id: 1, name: '普通', value: 1, label: '普通' },
//   serviceTarget: { label: '請選擇', value: null, disable: true },
//   projectFunction: { label: '請選擇', value: null, disable: true },
//   currentVersion: '',
//   device: '',
//   deviceVersion: '',
//   tags: [ { label: '收集中', default: true } ],
//   azureURL: '',
//   targetVersion: '',
//   severity: { id: 50, name: 'minor', label: '次要', value: 50 },
//   deadline: null,
//   platform: '智生活',
//   product: '管理版',
//   service: 'WEB',
//   files: [],
//   issueLinks: [
//     {
//       id: 2,
//       uuid: '4624f2bc-2d7a-4a67-b88e-e0ffd4bc100a',
//       label: '#000002',
//       status: '已分配',
//       project: '管理版Web',
//       title: '新北三峽農場茶園白茫茫 睽違8年再飄雪002',
//       createdAt: '2024年01月23日 下午 3:01',
//       link: '/bug/2'
//     }
//   ]
// }

export const FormDataZod = z
  .object({
    status: z
      .object({
        id: z.coerce.number().default(0),
        name: z.string().default(''),
        label: z.string().default(''),
        value: z.coerce.number().default(0),
      })
      .default({}),
    subject: z.string().default(''),
    project: z
      .object({
        id: z.coerce.number().default(0),
        code: z.string().default(''),
        name: z.string().default(''),
      })
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
        id: z.coerce.string().default(''),
        name: z.string().default(''),
        label: z.string().default(''),
        value: z.coerce.string().default(''),
      })
      .default({}),
    handler: z
      .object({
        id: z.coerce.string().default(''),
        name: z.string().default(''),
        code: z.string().default(''),
        value: z.coerce.string().default(''),
        label: z.string().default(''),
      })
      .default({}),
    descTextarea: z.coerce.string().default('todo...'),
    infoTextarea: z.string().default(''),
    priority: z
      .object({
        id: z.coerce.number().default(0),
        name: z.string().default(''),
        label: z.string().default(''),
        value: z.coerce.number().default(0),
      })
      .default({}),
    reproducibility: z
      .object({
        id: z.coerce.number().default(0),
        name: z.string().default(''),
        label: z.string().default(''),
        value: z.coerce.number().default(0),
      })
      .default({}),
    category: z
      .object({
        id: z.coerce.number().default(0),
        name: z.string().default(''),
        value: z.coerce.number().default(0),
        label: z.string().default(''),
      })
      .default({}),
    device: z.coerce.string().default(''),
    deviceVersion: z.string().default(''),
    tags: z
      .array(
        z.object({
          label: z.string().default(''),
          default: z.coerce.boolean().default(false),
        }),
      )
      .default([]),
    version: z.coerce.string().default(''),
    targetVersion: z.coerce.string().default(''),
    deadline: z.coerce.string().nullable().default(null),
    severity: z
      .object({
        id: z.coerce.number().default(0),
        name: z.string().default(''),
        label: z.string().default(''),
        value: z.coerce.number().default(0),
      })
      .default({}),
    platform: z.string().default(''),
    product: z.string().default(''),
    service: z.string().default(''),
  })
  .default({})
  .transform((obj) => {
    // todo...
    const _handler = obj.handlerType.id === 'USER' ? obj.handler : {};
    return {
      summary: obj.subject,
      description: obj.descTextarea?.trim() ?? 'todo...',
      additional_information: obj.infoTextarea,
      project: {
        id: obj.project.id,
        name: obj.project.name,
      },
      category: {
        id: obj.category.id,
        name: obj.category.name,
      },
      status: obj.status,
      reporter: obj.reporter,
      handler: _handler,
      priority: {
        name: obj.priority.name,
      },
      reproducibility: {
        name: obj.reproducibility.name,
      },
      severity: {
        name: obj.severity.name,
      },
      os: obj.device,
      os_build: obj.deviceVersion,
      version: obj.version,
      target_version: obj.targetVersion,
      build: obj.product,
      platform: obj.platform,
      tags: obj.tags.map((tag) => {
        return {
          name: tag.label,
        };
      }),
    };
  });

export type FormDataZodType = z.infer<typeof FormDataZod>;
