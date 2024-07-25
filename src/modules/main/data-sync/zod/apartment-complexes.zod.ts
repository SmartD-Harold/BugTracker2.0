import { z } from 'zod';

//[
//  {
//     "Id": "15072201",
//     "Name": "(測試用)三采企業大樓",
//     "City": "臺中市",
//     "Area": "北區",
//     "Address": "太原北路130號",
//     "PostalCode": "404",
//     "TelePhone": "04-35016326",
//     "Enabled": false,
//     "CreatedAt": "2023-11-27T00:00:00"
//   },
//   more...
// ]

export const ApartmentComplexesZod = z
  .object({
    Id: z.coerce.number(),
    Name: z.coerce.string().trim().default(''),
    City: z.coerce.string().trim().default(''),
    Area: z.coerce.string().trim().default(''),
    Address: z.coerce.string().trim().default(''),
    PostalCode: z.coerce.string().trim().default(''),
    TelePhone: z.coerce.string().trim().default(''),
    Enabled: z.coerce.boolean().default(false),
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
      enabled: item.Enabled,
      createdAt: item.CreatedAt,
    };
  });

export type ApartmentComplexesZodType = z.infer<typeof ApartmentComplexesZod>;

export const ApartmentComplexesArrayZod = z.array(ApartmentComplexesZod);
