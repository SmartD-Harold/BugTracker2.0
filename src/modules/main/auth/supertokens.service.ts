import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';
import Session from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserRoles from 'supertokens-node/recipe/userroles';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import customSession from './supertokens/plugins/session';
import smartDailyThirdParty from './supertokens/plugins/thirdPartyEmailPassword';

import {
  ConfigInjectionToken,
  AuthModuleConfigType,
} from './types/supertokens.config.interface';
import { AuthService } from './auth.service';

import {
  AuthorizationEndpointOfSmartDaily,
  DashboardConfig,
  ThirdPartyConfigOfSmartDaily,
  ThirdParty,
} from './types/supertokens.constants';

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) public config: AuthModuleConfigType,
    public readonly authService: AuthService,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Dashboard.init({
          admins: DashboardConfig,
        }),
        UserRoles.init(),
        UserMetadata.init(),
        Session.init({
          override: {
            functions: (originalImplementation) => {
              return {
                ...originalImplementation,
                createNewSession: customSession.createNewSession(
                  originalImplementation,
                  authService,
                ),
              };
            },
          },
        }),
        ThirdPartyEmailPassword.init({
          // We have provided you with development keys which you can use for testing.
          // IMPORTANT: Please replace them with your own OAuth keys for production use.
          override: {
            functions: (originalImplementation) => {
              return {
                ...originalImplementation,
                // override the thirdParty sign in / up function
                thirdPartySignInUp: smartDailyThirdParty.thirdPartySignInUp(
                  originalImplementation,
                  authService,
                ),
              };
            },
          },
          providers: [
            {
              config: {
                thirdPartyId: ThirdParty.Google,
                clients: [
                  {
                    clientId:
                      '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
                    clientSecret: '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',
                    scope: ['email', 'profile'],
                  },
                ],
              },
            },
            {
              // Smart Daily OAuth Server
              config: {
                thirdPartyId: ThirdPartyConfigOfSmartDaily.thirdPartyId,
                name: ThirdPartyConfigOfSmartDaily.name,
                clients: [
                  {
                    clientId: 'fetch query params',
                  },
                ],
                authorizationEndpoint: AuthorizationEndpointOfSmartDaily,
              },
              override: (originalImplementation) => {
                return {
                  ...originalImplementation,
                  getConfigForClientType:
                    smartDailyThirdParty.customProvider.getConfigForClientType(
                      originalImplementation,
                    ),
                  exchangeAuthCodeForOAuthTokens:
                    smartDailyThirdParty.customProvider.exchangeAuthCodeForOAuthTokens(),
                  getUserInfo:
                    smartDailyThirdParty.customProvider.getUserInfo(),
                };
              },
            },
          ],
        }),
      ],
    });
  }
}
