import { z } from 'zod';

//[
//  {
//     "Id": 1,
//     "Code": "P01",
//     "Name": "管理版Web",
//     "Desc": "",
//     "Platform": "智生活",
//     "Product": "管理版",
//     "Service": "WEB",
//     "Enabled": true,
//     "Order": 1
//   },
//   more...
//  ]
export const ProjectZod = z
  .object({
    Id: z.coerce.number(),
    Code: z.coerce.string().trim().default(''),
    Name: z.coerce.string().trim().default(''),
    Desc: z.coerce.string().trim().default(''),
    Platform: z.coerce.string().trim().default(''),
    Product: z.coerce.string().trim().default(''),
    Service: z.coerce.string().trim().default(''),
    Enabled: z.coerce.boolean().default(true),
    Order: z.coerce.number().default(0),
  })
  .transform((item) => {
    return {
      id: item.Id,
      code: item.Code,
      name: item.Name,
      desc: item.Desc,
      platform: item.Platform,
      product: item.Product,
      service: item.Service,
      enabled: item.Enabled,
      order: item.Order,
    };
  });

export type ProjectZodType = z.infer<typeof ProjectZod>;

export const ProjectArrayZod = z.array(ProjectZod);
