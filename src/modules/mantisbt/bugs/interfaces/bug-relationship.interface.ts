import { BasicEnumClass } from './basic.interface';

export class BugRelationship extends BasicEnumClass {}

export interface BugRelationshipInterface {
  [key: string]: BasicEnumClass;
}

export const BugRelationshipKeyEnum = {
  duplicate_of_0: 0,
  related_to_1: 1,
  dependant_on_2: 2,
  blocks_3: 3,
  has_duplicate_4: 4,
};

// 0: duplicate_of, 1: related_to, 2: dependant_on, 3: blocks, 4: has_duplicate
// 0: 重複下列問題, 1:與下列問題相關, 2:為下列問題的父問題, 3:為下列問題的子問題 4: 有重複下列問題
export const BugRelationshipInterfaceEnum: Readonly<BugRelationshipInterface> =
  {
    [BugRelationshipKeyEnum.duplicate_of_0]: {
      id: BugRelationshipKeyEnum.duplicate_of_0,
      name: 'duplicate_of',
      label: '重複下列問題',
    },
    [BugRelationshipKeyEnum.related_to_1]: {
      id: BugRelationshipKeyEnum.related_to_1,
      name: 'related_to',
      label: '與下列問題相關',
    },
    [BugRelationshipKeyEnum.dependant_on_2]: {
      id: BugRelationshipKeyEnum.dependant_on_2,
      name: 'dependant_on',
      label: '為下列問題的父問題',
    },
    [BugRelationshipKeyEnum.blocks_3]: {
      id: BugRelationshipKeyEnum.blocks_3,
      name: 'blocks',
      label: '為下列問題的子問題',
    },
    [BugRelationshipKeyEnum.has_duplicate_4]: {
      id: BugRelationshipKeyEnum.has_duplicate_4,
      name: 'has_duplicate',
      label: '有重複下列問題',
    },
  };
