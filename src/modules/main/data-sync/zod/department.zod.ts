import { z } from 'zod';

//[
//  {
//     "Id": 14670,
//     "EmployeeId": "S2402001",
//     "Name": "林芷萱",
//     "Email": "vicky.lin@smartdaily.com.tw",
//     "Department": "商業開發與產品設計部"
//   },
//   more...
//  ]
export const DepartmentZod = z
  .object({
    Code: z.coerce.string().default(''),
    Name: z.coerce.string().trim().default(''),
    Members: z.coerce.number().default(0),
    SupervisorEmail: z.coerce.string().email().default(''),
    SupervisorName: z.coerce.string().trim().nullable().default(null),
  })
  .transform((item) => {
    return {
      code: item.Code,
      name: item.Name,
      members: item.Members,
      supervisorEmail: item.SupervisorEmail,
      supervisorName: item.SupervisorName,
    };
  });

export type DepartmentZodType = z.infer<typeof DepartmentZod>;

export const DepartmentArrayZod = z.array(DepartmentZod);
