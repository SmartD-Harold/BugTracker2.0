// ThirdPartyEmailPassword /override
import thirdPartySignInUp from './thirdPartySignInUp';
// ThirdPartyEmailPassword / Provider / smartDaily / override
import getUserInfo from './smartDaily/getUserInfo';
import getConfigForClientType from './smartDaily/getConfigForClientType';
import exchangeAuthCodeForOAuthTokens from './smartDaily/exchangeAuthCodeForOAuthTokens';

export { getUserInfo, getConfigForClientType, exchangeAuthCodeForOAuthTokens };

export default {
  thirdPartySignInUp,
  customProvider: {
    getUserInfo,
    getConfigForClientType,
    exchangeAuthCodeForOAuthTokens,
  },
};
