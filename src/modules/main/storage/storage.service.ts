import {
  HttpStatus,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Bucket, Storage } from '@google-cloud/storage';
import { nanoid } from 'nanoid';
import { BugtrackerIssuesFilesRepository } from '../../bugtracker/issues/bugtracker-issues-files.repository';
import * as path from 'path';
import {
  FileType,
  GCPMetadataType,
  UploadFileResultType,
} from './interfaces/storage.interfaces';
import { ConfigService } from '@nestjs/config';
import { ConfigurationKey } from '../../../../config/configuration.config';

@Injectable()
export class StorageService {
  private bucket: Bucket;
  private storage: Storage;
  private googleapisDomain: string;
  protected destination: string;

  // BugTracker
  constructor(
    public configService: ConfigService,
    public readonly bugtrackerIssuesFilesRepository: BugtrackerIssuesFilesRepository,
  ) {
    this.storage = new Storage({
      projectId: configService.get(ConfigurationKey.google.storage.project),
      keyFilename: configService.get(ConfigurationKey.google.storage.keyPath),
    });
    this.bucket = this.storage.bucket(
      configService.get(ConfigurationKey.google.storage.bucket),
    );
    this.googleapisDomain = configService.get(
      ConfigurationKey.google.storage.publicUrl,
    );
    this.destination = configService.get(
      ConfigurationKey.google.storage.destination,
    );
  }

  // SmartDaily
  // constructor() {
  //   // bucket
  //   this.storage = new Storage({
  //     projectId: 'kingnetcare',
  //     keyFilename:
  //       '/Users/harold/MYKEYS/google-cloud-storage/smartdaily/kingnetcare-8e7fec4ae5f2.json',
  //   });
  //   // this.bucket = this.storage.bucket('knst-bugtracker');
  //   this.bucket = this.storage.bucket('knst-bugtracker-datasync');
  // }

  private getFilePublicURL(filename: string) {
    const myUrl = new URL(this.googleapisDomain);

    myUrl.pathname = path.join(
      `/${this.bucket.name}`,
      this.destination,
      `/${filename}`,
    );

    return myUrl.toString();
  }

  async listFiles() {
    const [files] = await this.bucket.getFiles();

    return files.map((file) => {
      return file.name;
    });
  }

  async saveFile(
    file: FileType,
    customMetadata: GCPMetadataType = {},
  ): Promise<UploadFileResultType> {
    const { uuid, ...metadata } = customMetadata;
    const gcpFile = await this.uploadFile(file, metadata);

    const dbFile = await this.bugtrackerIssuesFilesRepository.insert({
      nanoid: gcpFile.id,
      destination: gcpFile.destination,
      originalName: gcpFile.originalName,
      filename: gcpFile.filename,
      contentType: gcpFile.contentType,
      userId: gcpFile.metadata.userId || 0,
      uuid: uuid,
      filesize: gcpFile.size,
    });

    const { id, createdAt = '' } = dbFile.generatedMaps[0] || {};

    return {
      ...gcpFile,
      createdAt,
    };
  }

  async uploadFile(
    file: FileType,
    customMetadata: GCPMetadataType = {},
  ): Promise<UploadFileResultType> {
    const originalName = file.originalname;

    const nanoidCode = nanoid();
    const filename = `${nanoidCode}${path.extname(originalName)}`;

    const contentType = file.mimetype;

    const fileSize = file.size || 0;

    const metadata = {
      ...customMetadata,
    };

    const uploadFromBuffer: (inputFile: FileType) => Promise<string> = (
      inputFile: FileType,
    ) =>
      new Promise((resolve, reject) => {
        const bucketFile = this.bucket.file(`${this.destination}/${filename}`);
        const ws = bucketFile.createWriteStream({
          metadata: {
            contentType,
            metadata,
          },
          resumable: false,
          public: true,
        }); //創造可寫流
        ws.on('error', (err) => {
          reject(err);
        })
          .on('finish', async () => {
            resolve(await bucketFile.publicUrl()); // 會回傳檔案的url
          })
          .end(inputFile.buffer); //寫入資料囉
      });

    const publicURL = await uploadFromBuffer(file);

    console.log('uploadFromBuffer');
    console.log('url', publicURL);

    // const blobStream = this.bucket
    //   .file(`${this.destination}/${filename}`)
    //   .createWriteStream({
    //     metadata: {
    //       contentType,
    //       metadata,
    //     },
    //     resumable: false,
    //     public: true,
    //   });
    // blobStream.on('finish', async () => {});
    // blobStream.end(file.buffer);

    return {
      id: nanoidCode,
      bucket: this.bucket.name,
      destination: this.destination,
      originalName,
      filename: filename,
      contentType,
      metadata,
      size: fileSize,
      url: publicURL, //this.getFilePublicURL(filename),
    };
  }

  async deleteFile(nanoid: string, uuid: string): Promise<any> {
    const dbFile = await this.bugtrackerIssuesFilesRepository.findOne({
      where: {
        nanoid,
        uuid,
      },
    });

    if (!dbFile) {
      throw new NotFoundException();
    }

    if (dbFile?.bugId) {
      await this.bugtrackerIssuesFilesRepository.softDelete({
        id: dbFile.id,
      });
    } else {
      try {
        await this.bugtrackerIssuesFilesRepository.delete({
          id: dbFile.id,
        });
        await this.bucket
          .file(`${dbFile.destination}/${dbFile.filename}`)
          .delete();
      } catch (e) {
        throw new ServiceUnavailableException('GCP File delete failed');
      }
    }

    return {
      status: HttpStatus.OK,
    };
  }

  async setFileMetadata(
    metadataOptions: {
      [key: string]: any;
    },
    fileName: string,
  ) {
    if (fileName === '') return {};

    const bucketFile = this.bucket.file(`${this.destination}/${fileName}`);

    // Get the file's metadata
    const [metadata] = await bucketFile.getMetadata();

    const _metadata = {
      ...metadata.metadata,
      ...metadataOptions,
    };

    if (Object.keys(metadataOptions).length > 0) {
      metadata.metadata = _metadata;
    }

    await bucketFile.setMetadata(metadata);

    return _metadata;
  }
}
