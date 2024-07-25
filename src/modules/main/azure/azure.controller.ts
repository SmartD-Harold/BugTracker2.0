import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AzureService } from './azure.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUserInterceptor } from '../auth/interceptors/current-user.interceptor';

@Controller('azure')
export class AzureController {
  constructor(private readonly azureService: AzureService) {}

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Get('work-item/:id')
  async getWorkItem(
    @Param('id', ParseIntPipe) id: number,
    @Query('org') org?: string,
    @Query('project') project?: string,
  ) {
    const _data = await this.azureService.getWorkItem({
      id,
      org,
      project,
    });
    return {
      title: 'azure work item by id',
      data: _data,
    };
  }
}
