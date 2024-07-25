import SuperTokens from 'supertokens-node';
import type { TypeProvider } from 'supertokens-node/recipe/thirdpartyemailpassword';
import { ProviderConfigForClientType } from 'supertokens-node/lib/build/recipe/thirdparty/types';
import { ThirdPartyConfigOfSmartDaily } from '../../../../types/supertokens.constants';

type InputType = {
  clientType?: string | undefined;
  userContext: any;
};

type RequestOriginalType = {
  baseUrl: string;
  query: {
    redirectURIOnProviderDashboard: string;
    thirdPartyId: string;
  };
};

// Doc: https://kingnetrd.visualstudio.com/RD-ProjectWorkItem/_wiki/wikis/RD-ProjectWorkItem.wiki/667/%E4%BC%81%E6%A5%AD%E9%9B%B2Identity-%E7%AC%AC%E4%B8%89%E6%96%B9%E4%B8%B2%E6%8E%A5%E6%96%87%E4%BB%B6
enum SmartDailyAuthorizeURLQuery {
  clientId = 'ClientId',
  redirectUri = 'RedirectUri',
  nonce = 'Nonce',
  state = 'State',
}

// docs: https://supertokens.com/docs/nodejs/modules/recipe_thirdparty.html
const getConfigForClientType = (originalImplementation: TypeProvider) => {
  return async function (
    input: InputType,
  ): Promise<ProviderConfigForClientType> {
    console.log('🎯getConfigForClientType');
    const config = originalImplementation.getConfigForClientType(input);
    const request = SuperTokens.getRequestFromUserContext(input.userContext);
    const { baseUrl, query }: RequestOriginalType = request.original;

    if (baseUrl === '/auth/authorisationurl') {
      const { redirectURIOnProviderDashboard } = query;
      const myURL = new URL(redirectURIOnProviderDashboard);
      const clientId = myURL.searchParams.get(
        SmartDailyAuthorizeURLQuery.clientId,
      );
      return {
        ...config,
        thirdPartyId: ThirdPartyConfigOfSmartDaily.thirdPartyId,
        clientId,
        authorizationEndpoint: redirectURIOnProviderDashboard,
      };
    }

    return config;
  };
};

export default getConfigForClientType;
