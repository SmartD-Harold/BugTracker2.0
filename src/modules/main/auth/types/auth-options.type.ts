import { ModuleMetadata } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { AuthModuleConfigType } from './supertokens.config.interface';

type AuthAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<AuthModuleConfigType>, 'useFactory' | 'inject'>;

export default AuthAsyncOptions;
