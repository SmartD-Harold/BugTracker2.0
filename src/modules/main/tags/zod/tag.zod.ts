import { z } from 'zod';

//                {
//                     "id": 4,
//                     "mantisbtTagId": 4,
//                     "name": "台中",
//                     "description": "",
//                     "bugCount": 1,
//                     "tagGroupId": 3,
//                     "tagGroup": {
//                         "id": 3,
//                         "code": "QAE",
//                         "name": "QA",
//                         "createdAt": "2024-02-27T03:31:24.182Z",
//                         "updatedAt": "2024-02-27T03:36:51.849Z",
//                         "deletedAt": null
//                     }
//                 },

//{
//           "id": 1,
//           "code": "ALL",
//           "name": "全部",
//           "count": 8,
//           "lists": [
//             1,
//             5,
//             6,
//             7,
//             8,
//             9,
//             10,
//             11
//           ]
//         }

const TagGroupZod = z
  .object({
    id: z.coerce.number().default(0),
    code: z.coerce.string().default(''),
    name: z.coerce.string().default(''),
    createdAt: z.coerce.date().default(null),
    updatedAt: z.coerce.date().default(null),
    deletedAt: z.coerce.date().nullable().default(null),
  })
  .default({})
  .transform((obj) => {
    return {
      id: obj.id,
      code: obj.code,
      name: obj.name,
      // createdAt: obj.createdAt,
      // updatedAt: obj.updatedAt,
      // deletedAt: obj.deletedAt,
    };
  });

export type TagGroupZodType = z.infer<typeof TagGroupZod>;

export const TagGroupsZod = z.array(TagGroupZod).default([]);

export type TagGroupsZodType = z.infer<typeof TagGroupsZod>;

const TagGroupWithListAndCountZod = z
  .object({
    id: z.coerce.number().default(0),
    code: z.coerce.string().default(''),
    name: z.coerce.string().default(''),
    count: z.coerce.number().default(0),
    lists: z.array(z.coerce.number()).default([]),
  })
  .default({})
  .transform((obj) => {
    return {
      id: obj.id,
      code: obj.code,
      name: obj.name,
      count: obj.count,
      lists: obj.lists,
    };
  });

export type TagGroupWithListAndCountZodType = z.infer<
  typeof TagGroupWithListAndCountZod
>;

export const TagGroupsWithListAndCountZod = z
  .array(TagGroupWithListAndCountZod)
  .default([]);

export type TagGroupsWithListAndCountZodType = z.infer<
  typeof TagGroupsWithListAndCountZod
>;
export const TagZod = z
  .object({
    id: z.coerce.number().default(0),
    mantisbtTagId: z.coerce.number().default(0),
    name: z.coerce.string().default(''),
    description: z.coerce.string().default(''),
    bugCount: z.coerce.number().default(0),
    tagGroupId: z.coerce.number().default(0),
    tagGroup: TagGroupZod,
  })
  .default({})
  .transform((obj) => {
    return {
      id: obj.mantisbtTagId,
      name: obj.name,
      description: obj.description,
      count: obj.bugCount,
      groupId: obj.tagGroupId ?? null,
      group: obj.tagGroup,
    };
  });

export type TagZodType = z.infer<typeof TagZod>;

export const TagsZod = z.array(TagZod).default([]);

export type TagsZodType = z.infer<typeof TagsZod>;
