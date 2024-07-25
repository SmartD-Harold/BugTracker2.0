import { z } from 'zod';

// [
//  {
//     "Id": "24022907",
//     "Name": "後驛好林居",
//     "City": "高雄市",
//     "Area": "三民區",
//     "Address": "中華二路102巷8號",
//     "PostalCode": "807",
//     "TelePhone": "07-3157962",
//     "Enable": true,
//     "CreatedAt": "2024-02-29T00:00:00"
//   }
//   more...
//  ]
export const ConstructionCompanyZod = z
  .object({
    Id: z.coerce.number(),
    Name: z.coerce.string().trim().default(''),
    City: z.coerce.string().trim().default(''),
    Area: z.coerce.string().trim().default(''),
    Address: z.coerce.string().trim().default(''),
    PostalCode: z.coerce.string().trim().default(''),
    TelePhone: z.coerce.string().trim().default(''),
    Enable: z.coerce.boolean().default(false),
    CreatedAt: z
      .string()
      .transform((str) => new Date(str).toLocaleString('zh-TW'))
      .nullable()
      .default(null),
  })
  .transform((item) => {
    return {
      code: item.Id,
      name: item.Name,
      city: item.City,
      area: item.Area,
      address: item.Address,
      postCode: item.PostalCode,
      phone: item.TelePhone,
      enabled: item.Enable,
      createdAt: item.CreatedAt,
    };
  });

export type ConstructionCompanyZodType = z.infer<typeof ConstructionCompanyZod>;

export const ConstructionCompanyArrayZod = z.array(ConstructionCompanyZod);
