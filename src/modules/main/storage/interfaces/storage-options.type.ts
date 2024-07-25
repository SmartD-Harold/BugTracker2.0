import { ModuleMetadata } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { StorageConfigType } from './storage.interfaces';

type StorageAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<StorageConfigType>, 'useFactory' | 'inject'>;

export default StorageAsyncOptions;
