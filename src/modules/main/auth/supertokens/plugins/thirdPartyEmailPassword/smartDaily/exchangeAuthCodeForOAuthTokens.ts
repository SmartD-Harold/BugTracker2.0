import {
  SmartDailyOAuthUserType,
  SmartDailyAccessTokenInfoType,
  OAuthTokensType,
} from '../../types/thirdPartEmailPassword.interface';

type InputType = {
  redirectURIInfo: {
    redirectURIOnProviderDashboard: string;
    redirectURIQueryParams: {
      [key: string]: any;
      authorizeInfo: SmartDailyAccessTokenInfoType;
      user: SmartDailyOAuthUserType;
    };
    pkceCodeVerifier?: string;
  };
  userContext: any;
};

// docs: https://supertokens.com/docs/nodejs/modules/recipe_thirdparty.html
const exchangeAuthCodeForOAuthTokens = () => {
  return async function (input: InputType) {
    console.log('🎯exchangeAuthCodeForOAuthTokens');
    // console.log('input');
    // console.log(input);
    // console.log('authorizeInfo');
    // console.log(authorizeInfo);
    // console.log('user');
    // console.log(user);
    const { user, authorizeInfo } =
      input.redirectURIInfo.redirectURIQueryParams;
    const { accessTokenInfo, refreshTokenInfo, expiresIn } = authorizeInfo;
    const result: OAuthTokensType = {
      expires_in: expiresIn,
      access_token: accessTokenInfo.accessToken,
      create_at: accessTokenInfo.createAt,
      expired_at: accessTokenInfo.expiredAt,
      refresh_token: accessTokenInfo.accessToken,
      refresh_token_info: {
        expired_at: refreshTokenInfo.expiredAt,
      },
      token_type: 'Bearer',
      user,
    };
    return result;
  };
};

export default exchangeAuthCodeForOAuthTokens;
