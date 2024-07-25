import { BasicEnumClass } from '../../../mantisbt/bugs/interfaces/basic.interface';

export class ServiceTargetType extends BasicEnumClass {}
export type ServiceTargetEnumsType =
  | 'apartmentComplex'
  | 'estateManagementCompany'
  | 'constructionCompany';
interface ServiceTargetTypeType {
  [key: number]: ServiceTargetType;
}

export const serviceTargetTypeKeyEnum = {
  apartmentComplex_1: 1,
  estateManagementCompany_2: 2,
  constructionCompany_3: 3,
};

export const serviceTargetTypeValueEnum = {
  apartmentComplex: 'apartmentComplex',
  estateManagementCompany: 'estateManagementCompany',
  constructionCompany: 'constructionCompany',
};

export const serviceTargetTypeEnum: ServiceTargetTypeType = {
  [serviceTargetTypeKeyEnum.apartmentComplex_1]: {
    id: serviceTargetTypeKeyEnum.apartmentComplex_1,
    name: 'apartmentComplex',
    label: '社區',
  },
  [serviceTargetTypeKeyEnum.estateManagementCompany_2]: {
    id: serviceTargetTypeKeyEnum.estateManagementCompany_2,
    name: 'estateManagementCompany',
    label: '物業管理公司',
  },
  [serviceTargetTypeKeyEnum.constructionCompany_3]: {
    id: serviceTargetTypeKeyEnum.constructionCompany_3,
    name: 'constructionCompany',
    label: '建設公司',
  },
};
