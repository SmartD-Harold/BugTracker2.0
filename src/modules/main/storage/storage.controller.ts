import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import {
  FileType,
  UploadFileResultType,
} from './interfaces/storage.interfaces';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUserInterceptor } from '../auth/interceptors/current-user.interceptor';
import { formatBytes } from '../../../utils/self';

interface MyRequest extends Request {
  currentUser: any;
}

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: MyRequest,
    @UploadedFile() file: FileType,
    @Body('uuid') uuid: string = uuidv4(),
    @Body('bugId') bugId?: string,
    @Body('bugNoteId') bugNoteId?: string,
  ): Promise<{
    title: string;
    data: UploadFileResultType;
  }> {
    const _metadata = {
      uuid: uuid ?? uuidv4(),
      userId: req?.currentUser.id || 0,
    };
    if (bugId) _metadata['bugId'] = bugId;
    if (bugNoteId) _metadata['bugNoteId'] = bugNoteId;

    const result = await this.storageService.saveFile(file, _metadata);

    return {
      title: 'upload file',
      data: {
        ...result,
        fileSize: formatBytes(file.size),
      },
    };
  }

  @Get('list')
  async listFiles() {
    const files = await this.storageService.listFiles();
    return {
      title: 'list files　& folders',
      data: files,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Delete('file/:id/:uuid')
  async deleteFile(@Param('id') nanoid: string, @Param('uuid') uuid: string) {
    const result = await this.storageService.deleteFile(nanoid, uuid);
    return {
      title: 'delete file',
      data: result,
    };
  }

  @UseGuards(new AuthGuard())
  @UseInterceptors(CurrentUserInterceptor)
  @Patch('file/metadata')
  async setFileMetadata(@Body() body: any) {
    const { filename, ...metadata } = body;

    const result = await this.storageService.setFileMetadata(
      metadata,
      filename,
    );
    return {
      title: 'set file metadata',
      data: result,
    };
  }
}
