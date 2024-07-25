import { z } from 'zod';

//[
//  {
//     "UUID": "fe6554e0-d3bd-4125-be8c-37d242f77c68",
//     "Code": "P01-F001",
//     "ProjectId": 1,
//     "Project": "管理版Web",
//     "Name": "實名制註冊",
//     "Order": 1,
//     "Enabled": true
//   },
//   more...
//  ]
export const FunctionZod = z
  .object({
    UUID: z.coerce.string().uuid().default(''),
    Code: z.coerce.string().trim().default(''),
    ProjectId: z.coerce.number().default(0),
    Project: z.coerce.string().trim().default(''),
    Name: z.coerce.string().trim().default(''),
    Order: z.coerce.number().default(0),
    Enabled: z.coerce.boolean().default(true),
  })
  .transform((item) => {
    return {
      uuid: item.UUID,
      code: item.Code,
      projectId: item.ProjectId,
      project: item.Project,
      name: item.Name,
      order: item.Order,
      enabled: item.Enabled,
    };
  });

export type FunctionZodType = z.infer<typeof FunctionZod>;

export const FunctionArrayZod = z.array(FunctionZod);
