import { z } from 'zod';

//[
//   {
//     "Id": 3,
//     "Name": "今網測試公司",
//     "City": "臺中市",
//     "CreatedAt": "2021-05-28T06:07:53"
//   },
//   more...
//  ]
export const EstateCompanyZod = z
  .object({
    Id: z.coerce.number(),
    Name: z.coerce.string().trim().default(''),
    City: z.coerce.string().trim().default(''),
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
      createdAt: item.CreatedAt,
    };
  });

export type EstateCompanyZodType = z.infer<typeof EstateCompanyZod>;

export const EstateCompanyArrayZod = z.array(EstateCompanyZod);
