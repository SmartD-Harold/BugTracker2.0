import { z } from 'zod';

//{
//     "summary": "Sample REST issue",
//     "description": "Description for sample REST issue.",
//     "additional_information": "More info about the issue",
//     "project": {
//         "id": 1,
//         "name": "mantisbt"
//     },
//     "category": {
//         "id": 5,
//         "name": "bugtracker"
//     },
//     "handler": {
//         "name": "vboctor"
//     },
//     "view_state": {
//         "id": 10,
//         "name": "public"
//     },
//     "priority": {
//         "name": "normal"
//     },
//     "severity": {
//         "name": "trivial"
//     },
//     "reproducibility": {
//         "name": "always"
//     },
//     "sticky": false,
//     "custom_fields": [
//         {
//             "field": {
//                 "id": 4,
//                 "name": "The City"
//             },
//             "value": "Seattle"
//         }
//     ],
//     "tags": [
//         {
//             "name": "mantishub"
//         }
//     ]
// }

//{
//   summary: '主題你好',
//   description: '描述你好',
//   additional_information: '其他資訊你好',
//   project: { id: 1, name: '管理版Web' },
//   category: { id: 1, name: '普通' },
//   status: { id: 10, name: 'new', label: '新問題', value: 10 },
//   handler: {},
//   priority: { name: 'normal' },
//   reproducibility: { name: 'sometimes' },
//   severity: { name: 'minor' },
//   version: '1.0.0',
//   os: '手機',
//   os_build: '2.0.0',
//   target_version: '1.2.0',
//   build: '管理版',
//   platform: '智生活',
//   tags: [ { name: '收集中' } ]
// }

export const CreateIssueZod = z
  .object({
    summary: z.coerce.string(),
    description: z.coerce.string().default(''),
    additional_information: z.coerce.string().default(''),
    project: z
      .object({
        id: z.coerce.number(),
        name: z.string(),
      })
      .default({}),
    category: z.object({
      id: z.coerce.number().default(1),
      name: z.string().default(''),
    }),
    handler: z.object({
      name: z.string().default(''),
    }),
    view_state: z
      .object({
        id: z.coerce.number().default(10),
        name: z.string().default('public'),
      })
      .default({}),
    priority: z.object({
      name: z.string().default('normal'),
    }),
    severity: z.object({
      name: z.string().default('trivial'),
    }),
    reproducibility: z.object({
      name: z.string().default('always'),
    }),
    os: z.string().default(''),
    os_build: z.string().default(''),
    build: z.string().default(''),
    platform: z.string().default(''),
    sticky: z.boolean().default(false),
    tags: z
      .array(
        z.object({
          name: z.string().default(''),
        }),
      )
      .nullable()
      .default([]),
  })
  .default({})
  .transform((data) => {
    return {
      summary: data.summary,
      description: data.description,
      additional_information: data.additional_information,
      project: data.project,
      category: data.category,
      handler: data.handler,
      view_state: data.view_state,
      priority: data.priority,
      severity: data.severity,
      reproducibility: data.reproducibility,
      os: data.os,
      os_build: data.os_build,
      build: data.build,
      platform: data.platform,
      sticky: data.sticky,
      tags: data.tags,
    };
  });

export type CreateIssueZodType = z.infer<typeof CreateIssueZod>;
