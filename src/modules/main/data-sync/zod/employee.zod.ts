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
export const EmployeeZod = z
  .object({
    Id: z.coerce.number(),
    EmployeeId: z.coerce.string().trim().default(''),
    Name: z.coerce.string().trim().default(''),
    Email: z.coerce.string().email().default(''),
    Department: z.coerce.string().trim().nullable().default(null),
  })
  .transform((item) => {
    return {
      code: item.Id,
      employeeId: item.EmployeeId,
      name: item.Name,
      email: item.Email,
      department: item.Department,
    };
  });

export type EmployeeZodType = z.infer<typeof EmployeeZod>;

export const EmployeeZodArrayZod = z.array(EmployeeZod);
