export const STORAGE_CONFIG_OPTIONS = 'STORAGE_CONFIG_OPTIONS';

export type FileType = Express.Multer.File;

export type GCPMetadataType = {
  uuid?: string;
  projectId?: number;
  bugId?: number;
  bugNoteId?: number;
  userId?: number;
};

export interface UploadFileResultType {
  id: string;
  bucket: string;
  destination: string;
  originalName: string;
  filename: string;
  contentType: string;
  metadata: GCPMetadataType;
  size: number;
  url: string;
  fileSize?: string;
  createdAt?: Date;
}

export interface StorageConfigType {
  keyPath: string;
  publicUrl: string;
  bucket: string;
  project: string;
  destination: string;
}
