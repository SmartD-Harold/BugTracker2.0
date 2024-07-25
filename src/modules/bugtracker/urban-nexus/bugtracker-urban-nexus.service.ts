import { Injectable } from '@nestjs/common';
import { BugtrackerApartmentComplexRepository } from './bugtracker-apartment-complex.repository';
import { BugtrackerConstructionCompanyRepository } from './bugtracker-construction-company.repository';
import { BugtrackerEstateManagementCompanyRepository } from './bugtracker-estate-management-company.repository';
import { BugtrackerUrbanNexusRepository } from './bugtracker-urban-nexus.repository';
import { serviceTargetTypeValueEnum } from '../issues/interfaces/service-target-type.interface';
import { LessThan, Like, MoreThan } from 'typeorm';

interface CustomServiceTargetType {
  id: number;
  code: string;
  name: string;
  city: string;
  dist?: string | null;
}

@Injectable()
export class BugtrackerUrbanNexusService {
  constructor(
    protected readonly apartmentComplexRepository: BugtrackerApartmentComplexRepository,
    protected readonly constructionCompanyRepository: BugtrackerConstructionCompanyRepository,
    protected readonly estateManagementRepository: BugtrackerEstateManagementCompanyRepository,
    protected readonly urbanNexusRepository: BugtrackerUrbanNexusRepository,
  ) {}

  /**
   * Find service target　取得其中一種目標對象
   * @param {string} targetCode 目標對象類型：apartmentComplex | estateManagementCompany | constructionCompany
   * @param {string} orderBy 排序方式：ASC | DESC
   * @param {string|null} search 搜尋文字
   * @param {number} limit 數量
   * @param {number|null} next 下個開始編號Id(不包含)
   * @param {number} page 目前頁數
   */
  async findServiceTarget(
    targetCode: string,
    {
      limit = 100,
      orderBy = 'ASC',
      next = null,
      search = null,
      page = 1,
    }: {
      limit?: number;
      orderBy?: 'ASC' | 'DESC';
      next?: number | null;
      search?: string | null;
      page?: number;
    } = {},
  ) {
    let result: CustomServiceTargetType[] = [];
    let totalCount = 0;

    let _optionCount = {};

    // order by id ASC
    const _where: {
      id: any;
      name?: any;
    } = {
      id: MoreThan(0),
    };
    if (orderBy === 'ASC' && next) {
      _where.id = MoreThan(next);
    }
    if (orderBy === 'DESC' && next) {
      _where.id = LessThan(next);
    }

    if (search) {
      _optionCount = {
        where: {
          name: Like(`%${search}%`),
        },
      };
      _where.name = Like(`%${search}%`);
    }

    const _options = {
      take: limit,
      where: {
        ..._where,
      },
      order: {
        id: orderBy,
      },
    };

    if (targetCode === serviceTargetTypeValueEnum.apartmentComplex) {
      totalCount = await this.apartmentComplexRepository.count(_optionCount);
      const _data = await this.apartmentComplexRepository.find(_options);
      result = _data.map((item) => {
        return {
          id: item.id,
          code: `${item.code}`,
          name: item.name,
          city: item.city,
          dist: item.dist,
        };
      });
    }

    if (targetCode === serviceTargetTypeValueEnum.estateManagementCompany) {
      totalCount = await this.estateManagementRepository.count(_optionCount);
      const _data = await this.estateManagementRepository.find({
        ..._options,
        where: {
          enabled: true,
        },
      });
      result = _data.map((item) => {
        return {
          id: item.id,
          code: `${item.code}`,
          name: item.name,
          city: item.city,
          dist: null,
        };
      });
    }

    if (targetCode === serviceTargetTypeValueEnum.constructionCompany) {
      totalCount = await this.constructionCompanyRepository.count(_optionCount);
      const _data = await this.constructionCompanyRepository.find({
        ..._options,
        where: {
          enabled: true,
        },
      });
      result = _data.map((item) => {
        return {
          id: item.id,
          code: `${item.code}`,
          name: item.name,
          city: item.city,
          dist: item.dist,
        };
      });
    }

    const firstResult = result[0] || { id: null };
    const lastResult = result[result.length - 1] || { id: null };

    const _size = result.length || 0;
    let _start = firstResult?.id || 0;
    let _next = lastResult?.id || 0;
    const _page = next && page ? page + 1 : 1;

    const pagination = {
      total: totalCount,
      limit,
      size: _size,
      page: _page,
      start: _start || null,
      next: _next || null,
      search: search || null,
    };
    if (page && page * limit >= totalCount) {
      pagination.next = null;
    }

    if (orderBy === 'DESC') {
      _start = lastResult?.id || 0;
      _next = firstResult?.id || 0;
      pagination.start = _next || null;
      pagination.next = _start || null;
      if (page && page * limit <= 1) {
        pagination.next = null;
      }
    }

    if (_size !== limit) {
      pagination.next = null;
    }

    return {
      type: targetCode,
      pagination,
      data: result,
    };
  }
}
