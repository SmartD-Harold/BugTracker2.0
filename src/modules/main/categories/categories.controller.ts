import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CategoriesService } from './categories.service';
import { CurrentUserInterceptor } from '../auth/interceptors/current-user.interceptor';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Get('sync')
  async syncCategories(
    @Query('page') page?: number,
    @Query('size') size?: number,
  ) {
    const data = await this.categoriesService.syncCategories({
      page,
      size,
    });
    return {
      title: 'sync categories',
      data,
    };
  }
}
