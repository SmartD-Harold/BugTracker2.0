import { BasicEnumClass } from './basic.interface';

export class BugRevisions extends BasicEnumClass {}

export interface BugRevisionsType {
  [key: number]: BugRevisions;
}

// https://github.com/mantisbt/mantisbt/blob/master/core/constant_inc.php#L213
export const BugRevisionsKey = {
  any_0: 0,
  description_1: 1,
  stepsToReproduce_2: 2,
  additionalInfo_3: 3,
  bugNote_4: 4,
};

export const BugRevisionsEnum: Readonly<BugRevisionsType> = {
  [BugRevisionsKey.any_0]: {
    id: BugRevisionsKey.any_0,
    name: 'any',
    label: '任何',
  },
  [BugRevisionsKey.description_1]: {
    id: BugRevisionsKey.description_1,
    name: 'description',
    label: '描述',
  },
  [BugRevisionsKey.stepsToReproduce_2]: {
    id: BugRevisionsKey.stepsToReproduce_2,
    name: 'stepsToReproduce',
    label: '重現步驟',
  },
  [BugRevisionsKey.additionalInfo_3]: {
    id: BugRevisionsKey.additionalInfo_3,
    name: 'additionalInfo',
    label: '附加資訊',
  },
  [BugRevisionsKey.bugNote_4]: {
    id: BugRevisionsKey.bugNote_4,
    name: 'bugNote',
    label: '說明',
  },
};
