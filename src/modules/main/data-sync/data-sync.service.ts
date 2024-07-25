import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { BugtrackerApartmentComplexRepository } from '../../bugtracker/urban-nexus/bugtracker-apartment-complex.repository';
import { BugtrackerEstateManagementCompanyRepository } from '../../bugtracker/urban-nexus/bugtracker-estate-management-company.repository';
import { BugtrackerConstructionCompanyRepository } from '../../bugtracker/urban-nexus/bugtracker-construction-company.repository';
import {
  ApartmentComplexesArrayZod,
  EstateCompanyArrayZod,
  EstateCompanyZodType,
  ConstructionCompanyArrayZod,
  ConstructionCompanyZodType,
  ApartmentComplexesZodType,
  EmployeeZodType,
  EmployeeZodArrayZod,
  DepartmentArrayZod,
  FunctionZodType,
  FunctionArrayZod,
  ProjectZodType,
  ProjectArrayZod,
} from './zod';
import { BugtrackerEmployeeRepository } from '../../bugtracker/users/bugtracker-employee.repository';
import { BugtrackerEmployeeDepartmentsRepository } from '../../bugtracker/users/bugtracker-employee-departments.repository';
import { BugtrackerProjectFunctionsRepository } from '../../bugtracker/project-functions/bugtracker-project-functions.repository';
import { BugtrackerProjectsRepository } from '../../bugtracker/projects/bugtracker-projects.repository';
import { MantisbtProjectsRepository } from '../../mantisbt/projects/mantisbt-projects.repository';
import {
  AccessLevelKeys,
  MantisbtProjectEntityDefaultValues,
  ProjectStatusKeys,
  ProjectViewStatueKeys,
} from '../../mantisbt/projects/interfaces';

const SMART_DAILY_DOMAIN = 'smartdaily.com.tw';

interface ICodeAndName {
  code: number;
  name: string;
}

enum SmartDailyFileName {
  ApartmentComplexes = 'Community.json',
  EstateCompany = 'Estate-company.json',
  ConstructionCompany = 'Construction-company.json',
  Employee = 'Employee.json',
}
type SmartDailyFileNameType = `${SmartDailyFileName}`;

enum BugtrackerCustomFileName {
  ApartmentComplexes = 'Community.json',
  EstateCompany = 'Estate-company.json',
  ConstructionCompany = 'Construction-company.json',
  Employee = 'Employee.json',
  Department = 'Department.json', // 從Employee.json產生出來的部門資料
}
type BugtrackerFileNameType = `${BugtrackerCustomFileName}`;

enum BugtrackerSeederFileName {
  Functions = 'Functions.json',
  Projects = 'Projects.json',
}
type BugtrackerSeederFileNameType = `${BugtrackerSeederFileName}`;

type FileNameType =
  | SmartDailyFileNameType
  | BugtrackerFileNameType
  | BugtrackerSeederFileNameType;

enum SourceDirectoryName {
  SmartDaily = 'smartdaily', // PATH:src/source/smartdaily
  BugtrackerCustom = 'bugtracker/custom', // PATH:src/source/bugtracker/custom
  BugtrackerSeeder = 'bugtracker/seeder', // PATH:src/source/bugtracker/seeder
}
type SourceDirectoryNameType = `${SourceDirectoryName}`;

@Injectable()
export class DataSyncService {
  constructor(
    private readonly apartmentComplexRepository: BugtrackerApartmentComplexRepository,
    private readonly constructionCompanyRepository: BugtrackerConstructionCompanyRepository,
    private readonly estateManagementCompanyRepository: BugtrackerEstateManagementCompanyRepository,
    private readonly employeeRepository: BugtrackerEmployeeRepository,
    private readonly departmentsRepository: BugtrackerEmployeeDepartmentsRepository,
    private readonly functionsRepository: BugtrackerProjectFunctionsRepository,
    private readonly projectsRepository: BugtrackerProjectsRepository,
    private readonly mantisbtProjectsRepository: MantisbtProjectsRepository,
  ) {}

  /**
   * 從檔案取得資料
   * @param fileName 檔名
   * @param directory 目錄
   * @private
   */
  private getSourceJSONData(
    fileName: FileNameType,
    directory: SourceDirectoryNameType,
  ) {
    let data: any = [];

    const filePath = path.join('src', 'source', directory, fileName);

    if (fs.existsSync(filePath)) {
      data = fs.readFileSync(filePath, 'utf-8') || '[]';
    }

    return JSON.parse(data);
  }

  /**
   * 取得自訂資料
   * @param data
   * @param directoryName
   * @param transformDataFn
   * @private
   */
  private async additionalCustomData<T extends ICodeAndName>(
    data: T[],
    directoryName: BugtrackerFileNameType,
    transformDataFn: (item: T[]) => any,
  ): Promise<Map<number, T>> {
    const _data = new Map(data.map((item: T) => [item.code, item]));

    const secondData: T[] = await this.getSourceJSONData(
      directoryName,
      SourceDirectoryName.BugtrackerCustom,
    );

    const additionalData: T[] = transformDataFn(secondData);

    if (additionalData.length === 0) return _data;

    additionalData.map((item) => {
      if (!item.code) return;

      if (_data.has(item.code)) {
        // 取得匯入資料
        const innerItem = _data.get(item.code);

        // 清除空值
        const clearItem = Object.entries(item).reduce((acc, [key, value]) => {
          if (value !== '') {
            acc[key] = value;
          }
          return acc;
        }, {});

        // 合併兩個物件: 自訂資料覆蓋匯入資料
        _data.set(item.code, {
          ...innerItem,
          ...clearItem,
        });
      } else {
        _data.set(item.code, item);
      }
    });

    return _data;
  }

  /**
   * 社區資料從檔案匯入資料庫
   */
  async apartmentComplexesDataToDB() {
    const subtotal = {
      insert: 0,
      skip: 0,
    };

    const jsonData: ApartmentComplexesZodType[] = this.getSourceJSONData(
      SmartDailyFileName.ApartmentComplexes,
      SourceDirectoryName.SmartDaily,
    );
    const zodData: ApartmentComplexesZodType[] =
      ApartmentComplexesArrayZod.parse(jsonData);

    zodData.sort((a, b) => +b.enabled - +a.enabled);

    const customData: Map<number, ApartmentComplexesZodType> =
      await this.additionalCustomData<ApartmentComplexesZodType>(
        zodData,
        BugtrackerCustomFileName.ApartmentComplexes,
        ApartmentComplexesArrayZod.parse,
      );

    await this.apartmentComplexRepository.clear();

    for (const ApartmentComplexes of customData.values()) {
      if (!ApartmentComplexes.code) {
        subtotal.skip++;
        continue;
      }

      await this.apartmentComplexRepository.insert({
        code: ApartmentComplexes.code,
        name: ApartmentComplexes.name,
        enabled: ApartmentComplexes.enabled,
        city: ApartmentComplexes.city,
        dist: ApartmentComplexes.area,
        address: ApartmentComplexes.address,
        postCode: ApartmentComplexes.postCode,
        phone: ApartmentComplexes.phone,
        createdAt: ApartmentComplexes.createdAt,
      });
      subtotal.insert++;
    }

    return subtotal;
  }

  /**
   * 物業公司從檔案匯入資料庫
   */
  async estateCompanyDataToDB() {
    const subtotal = {
      insert: 0,
      skip: 0,
    };

    const jsonData = this.getSourceJSONData(
      SmartDailyFileName.EstateCompany,
      SourceDirectoryName.SmartDaily,
    );
    const zodData: EstateCompanyZodType[] =
      EstateCompanyArrayZod.parse(jsonData);

    const customData: Map<number, EstateCompanyZodType> =
      await this.additionalCustomData<EstateCompanyZodType>(
        zodData,
        BugtrackerCustomFileName.EstateCompany,
        EstateCompanyArrayZod.parse,
      );

    await this.estateManagementCompanyRepository.clear();

    for (const estateCompany of customData.values()) {
      if (!estateCompany.code) {
        subtotal.skip++;
        continue;
      }

      await this.estateManagementCompanyRepository.insert({
        code: estateCompany.code,
        name: estateCompany.name,
        city: estateCompany.city,
        createdAt: estateCompany.createdAt,
      });
      subtotal.insert++;
    }

    return subtotal;
  }

  /**
   * 建商資料從檔案匯入資料庫
   */
  async constructionCompanyDataToDB() {
    const subtotal = {
      insert: 0,
      skip: 0,
    };

    const jsonData = this.getSourceJSONData(
      SmartDailyFileName.ConstructionCompany,
      SourceDirectoryName.SmartDaily,
    );
    const zodData: ConstructionCompanyZodType[] =
      ConstructionCompanyArrayZod.parse(jsonData);

    const customData: Map<number, ConstructionCompanyZodType> =
      await this.additionalCustomData<ConstructionCompanyZodType>(
        zodData,
        BugtrackerCustomFileName.ConstructionCompany,
        ConstructionCompanyArrayZod.parse,
      );

    await this.constructionCompanyRepository.clear();

    for (const constructionCompany of customData.values()) {
      if (!constructionCompany.code) {
        subtotal.skip++;
        continue;
      }

      await this.constructionCompanyRepository.insert({
        code: constructionCompany.code,
        name: constructionCompany.name,
        city: constructionCompany.city,
        dist: constructionCompany.area,
        address: constructionCompany.address,
        postCode: constructionCompany.postCode,
        phone: constructionCompany.phone,
        enabled: constructionCompany.enabled,
        createdAt: constructionCompany.createdAt,
      });
      subtotal.insert++;
    }

    return subtotal;
  }

  /**
   * 今網員工資料從檔案匯入資料庫
   */
  async smartdailyEmployeeDataToDB() {
    const subtotal = {
      insert: 0,
      skip: 0,
    };

    const jsonData = this.getSourceJSONData(
      SmartDailyFileName.Employee,
      SourceDirectoryName.SmartDaily,
    );
    const zodData: EmployeeZodType[] = EmployeeZodArrayZod.parse(jsonData);

    const customData: Map<number, EmployeeZodType> =
      await this.additionalCustomData<EmployeeZodType>(
        zodData,
        BugtrackerCustomFileName.Employee,
        EmployeeZodArrayZod.parse,
      );

    // 清除員工資料
    await this.employeeRepository.clear();

    for (const employee of customData.values()) {
      if (!employee.code) {
        subtotal.skip++;
        continue;
      }

      const domain = employee.email.split('@')[1] || '';
      await this.employeeRepository.insert({
        code: employee.code,
        name: employee.name,
        employeeId: employee.employeeId,
        email: employee.email,
        department: employee.department,
        isCompanyEmail: domain === SMART_DAILY_DOMAIN,
      });
      subtotal.insert++;
    }

    return subtotal;
  }

  /**
   * 從員工資料匯總部門資料再同步到資料庫
   */
  async departmentDataByEmployeeDataToDB() {
    const subtotal = {
      insert: 0,
      skip: 0,
    };

    const jsonData = this.getSourceJSONData(
      SmartDailyFileName.Employee,
      SourceDirectoryName.SmartDaily,
    );
    const zodData: EmployeeZodType[] = EmployeeZodArrayZod.parse(jsonData);

    const customData: Map<number, EmployeeZodType> =
      await this.additionalCustomData<EmployeeZodType>(
        zodData,
        BugtrackerCustomFileName.Employee,
        EmployeeZodArrayZod.parse,
      );

    const departmentsMapData: Map<
      string,
      {
        code: string;
        name?: string;
        members: number;
        supervisorEmail?: string;
        supervisorName?: string;
      }
    > = new Map();

    for (const employees of customData.values()) {
      let count = 1;
      const _dept = employees.department || '';

      if (_dept === '') continue;

      if (departmentsMapData.has(_dept)) {
        const _item = departmentsMapData.get(_dept);
        count = _item.members + 1;
      }

      departmentsMapData.set(_dept, {
        code: _dept,
        name: _dept,
        members: count,
        supervisorEmail: '',
        supervisorName: '',
      });
    }

    if (departmentsMapData.size === 0) return subtotal;

    // 清除部門資料
    await this.departmentsRepository.clear();

    const secondCustomData = await this.getSourceJSONData(
      BugtrackerCustomFileName.Department,
      SourceDirectoryName.BugtrackerCustom,
    );

    const additionalDepartmentZodData =
      DepartmentArrayZod.parse(secondCustomData);

    if (additionalDepartmentZodData.length > 0) {
      additionalDepartmentZodData.map((deptZod) => {
        if (!deptZod.code) return;

        if (departmentsMapData.has(deptZod.code)) {
          // 取得匯入資料
          const sourceItem = departmentsMapData.get(deptZod.code);

          // 清除空值
          const clearItem = Object.entries(deptZod).reduce(
            (acc, [key, value]) => {
              if (value !== '') {
                acc[key] = value;
              }
              return acc;
            },
            {},
          );

          // 合併兩個物件: 自訂資料覆蓋匯入資料
          departmentsMapData.set(deptZod.code, {
            ...sourceItem,
            ...clearItem,
            members: sourceItem.members,
          });
        } else {
          departmentsMapData.set(deptZod.code, deptZod);
        }
      });
    }

    // 新增部門資料
    for (const [key, item] of departmentsMapData.entries()) {
      if (!key) {
        subtotal.skip++;
        continue;
      }

      await this.departmentsRepository.insert({
        code: item.code,
        name: item.name,
        members: item.members,
        supervisorEmail: item?.supervisorEmail ?? '',
        supervisorName: item?.supervisorName ?? '',
      });

      subtotal.insert++;
    }

    return subtotal;
  }

  /**
   * 專案的功能資料從檔案匯入資料庫
   */
  async projectFunctionsDataToDB() {
    const subtotal = {
      insert: 0,
      skip: 0,
    };

    const jsonData: FunctionZodType[] = this.getSourceJSONData(
      BugtrackerSeederFileName.Functions,
      SourceDirectoryName.BugtrackerSeeder,
    );
    const zodData: FunctionZodType[] = FunctionArrayZod.parse(jsonData);

    await this.functionsRepository.clear();

    for (const projectFunction of zodData) {
      if (!projectFunction.code) {
        subtotal.skip++;
        continue;
      }

      await this.functionsRepository.insert({
        uuid: projectFunction.uuid,
        code: projectFunction.code,
        name: projectFunction.name,
        projectId: projectFunction.projectId,
        project: projectFunction.project,
        order: projectFunction.order,
        enabled: projectFunction.enabled,
      });

      subtotal.insert++;
    }

    return subtotal;
  }

  /**
   * 專案資料從檔案匯入資料庫
   */
  async projectsDataToDB() {
    const subtotal = {
      insert: 0,
      skip: 0,
    };

    const jsonData: ProjectZodType[] = this.getSourceJSONData(
      BugtrackerSeederFileName.Projects,
      SourceDirectoryName.BugtrackerSeeder,
    );
    const zodData: ProjectZodType[] = ProjectArrayZod.parse(jsonData);

    // 清除Bugtracker Database專案資料
    await this.projectsRepository.clear();

    // 新增或更新Bugtracker Database專案資料
    for (const project of zodData) {
      if (!project.code) {
        subtotal.skip++;
        continue;
      }

      await this.projectsRepository.insert({
        id: project.id,
        mantisbtProjectId: project.id,
        code: project.code,
        name: project.name,
        platform: project.platform,
        product: project.product,
        service: project.service,
        order: project.order,
        deletedAt: project.enabled ? null : new Date(),
      });

      subtotal.insert++;
    }

    // 取得MantisBT Database專案資料
    const mantisbtProjects = await this.mantisbtProjectsRepository.find({
      select: ['id', 'name'],
    });
    // 將MantisBT專案資料轉換成MapData
    const mantisbtProjectsMap = new Map(
      mantisbtProjects.map((p) => [p.id, p.name]),
    );

    // 新增或更新MantisBT Database專案資料
    for (const project of zodData) {
      if (mantisbtProjectsMap.has(project.id)) {
        await this.mantisbtProjectsRepository.update(project.id, {
          name: project.name,
          description: project.desc,
          enabled: +project.enabled, // 1: true, 0: false
        });
      } else {
        await this.mantisbtProjectsRepository.insert({
          id: project.id,
          name: project.name,
          enabled: +project.enabled, // 1: true, 0: false
          description: project.desc,
          viewState: ProjectViewStatueKeys.public_10,
          accessMin: AccessLevelKeys.viewer_10,
          status: ProjectStatusKeys.stable_50,
          filePath: '',
          categoryId: MantisbtProjectEntityDefaultValues.categoryId,
          inheritGlobal: MantisbtProjectEntityDefaultValues.inheritGlobal,
        });
      }
    }

    return subtotal;
  }
}
