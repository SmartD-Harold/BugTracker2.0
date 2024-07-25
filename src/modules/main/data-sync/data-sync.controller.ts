import { Controller, Get } from '@nestjs/common';
import { DataSyncService } from './data-sync.service';

@Controller('data-sync')
export class DataSyncController {
  constructor(private readonly dataSyncService: DataSyncService) {}
  @Get('apartment-complexes')
  async syncApartmentComplexes() {
    const data = await this.dataSyncService.apartmentComplexesDataToDB();
    return {
      title: 'sync apartment complexes data',
      data,
    };
  }

  @Get('estate-company')
  async syncEstateCompany() {
    const data = await this.dataSyncService.estateCompanyDataToDB();
    return {
      title: 'sync estate company data',
      data,
    };
  }

  @Get('construction-company')
  async syncConstructionCompany() {
    const data = await this.dataSyncService.constructionCompanyDataToDB();
    return {
      title: 'sync construction company data',
      data,
    };
  }

  @Get('employee')
  async syncEmployee() {
    const employee = await this.dataSyncService.smartdailyEmployeeDataToDB();
    const departments =
      await this.dataSyncService.departmentDataByEmployeeDataToDB();
    return {
      title: 'sync employee and departments data',
      employee: employee,
      departments: departments,
    };
  }

  @Get('function')
  async syncProjectFunctions() {
    const data = await this.dataSyncService.projectFunctionsDataToDB();
    return {
      title: 'sync function data',
      data,
    };
  }

  @Get('project')
  async syncProject() {
    const data = await this.dataSyncService.projectsDataToDB();
    return {
      title: 'sync project data',
      data,
    };
  }
}
