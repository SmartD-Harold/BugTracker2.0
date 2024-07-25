import { AppInfo } from 'supertokens-node/types';

export const ConfigInjectionToken = 'ConfigInjectionToken';

export type AuthModuleConfigType = {
  appInfo: AppInfo;
  connectionURI: string;
  apiKey?: string;
};
