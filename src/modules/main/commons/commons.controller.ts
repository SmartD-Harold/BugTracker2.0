import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommonsService } from './commons.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUserInterceptor } from '../auth/interceptors/current-user.interceptor';
import { CommonsSerialize } from './interceptors/commons-serialize.interceptor';
import {
  GetSettingsIssuesWhitelistDto,
  SettingsIssuesDto,
} from './dto/settings-issues.dto';

import { SettingsIssuesType } from './interfaces/commons.interface';
import { SettingsUserDto } from './dto/settings-user.dto';

@Controller('commons')
export class CommonsController {
  constructor(private readonly commonsService: CommonsService) {}

  @CommonsSerialize(SettingsIssuesDto)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  @UseInterceptors(CurrentUserInterceptor)
  @UseGuards(new AuthGuard())
  @Get('settings/issues')
  async getSettingsIssuesProperty(
    @Query()
    query: GetSettingsIssuesWhitelistDto,
  ) {
    const { whitelist = [] } = query || {};

    const dataObjects = await this.commonsService.getSettingsIssues();
    let filteredDataObjects: Partial<SettingsIssuesType> = dataObjects;

    if (whitelist.length > 0) {
      const _dataKeys = Object.keys(dataObjects);
      filteredDataObjects = whitelist.reduce((acc, key) => {
        if (_dataKeys.includes(key)) {
          return { ...acc, [key]: dataObjects[key] };
        }
        return acc;
      }, {});
    }

    return {
      title: 'Settings Issues Property',
      maninData: filteredDataObjects,
    };
  }

  @CommonsSerialize(SettingsUserDto)
  // @UsePipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //   }),
  // )
  @UseInterceptors(CurrentUserInterceptor)
  @UseGuards(new AuthGuard())
  @Get('settings/users/handler')
  async getLastedAssignedUsers() {
    const lastUpdatedUser =
      await this.commonsService.getLastedAssignedTop10Users();

    console.log('lastUpdatedUser', lastUpdatedUser);

    return {
      title: 'Lasted assigned Tops10 users',
      maninData: lastUpdatedUser,
    };
  }

  @Get('settings/departments')
  async getDepartments() {
    return {
      title: 'Settings Departments',
      maninData: [],
    };
  }

  @Get('settings/roles')
  async getRoles() {
    return {
      title: 'Settings Roles',
      maninData: [],
    };
  }

  @Get('settings/projects')
  async getProjects() {
    return {
      title: 'Settings Projects',
      maninData: [],
    };
  }

  @Get('settings/functions')
  async getFunctions() {
    return {
      title: 'Settings functions',
      maninData: [],
    };
  }

  @Get('settings/apartment-complexes')
  async getApartmentComplexes() {
    return {
      title: 'Settings apartment complexes',
      maninData: [],
    };
  }

  @Get('settings/construction-company')
  async getConstructionCompany() {
    return {
      title: 'Settings construction company',
      maninData: [],
    };
  }

  @Get('settings/estate-management-company')
  async getEstateManagementCompany() {
    return {
      title: 'Settings estate management company',
      maninData: [],
    };
  }
}
