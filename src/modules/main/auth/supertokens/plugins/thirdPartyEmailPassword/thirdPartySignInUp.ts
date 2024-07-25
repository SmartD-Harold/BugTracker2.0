import UserMetadata from 'supertokens-node/recipe/usermetadata';
import type { RecipeInterface } from 'supertokens-node/recipe/thirdpartyemailpassword';
import {
  FromUserInfoAPIBySmartDailyType,
  FromUserInfoAPIFromGoogleType,
} from '../types/thirdPartEmailPassword.interface';
import { ThirdParty } from '../../../types/supertokens.constants';
import { AuthService } from '../../../auth.service';

type thirdPartySignInUpInput = {
  thirdPartyId: string;
  thirdPartyUserId: string;
  email: string;
  isVerified: boolean;
  oAuthTokens: {
    [key: string]: any;
  };
  rawUserInfoFromProvider: {
    fromIdTokenPayload?: {
      [key: string]: any;
    };
    fromUserInfoAPI:
      | FromUserInfoAPIBySmartDailyType
      | FromUserInfoAPIFromGoogleType;
  };
  tenantId: string;
  userContext: any;
};

type metaDataType = {
  [key: string]: any;
  bug_master_user_id: number;
  user_id: string;
  account: string;
  account_type: number;
  first_name: string;
  last_name: string;
};

const thirdPartySignInUp = (
  originalImplementation: RecipeInterface,
  authService: AuthService,
) => {
  return async function (input: thirdPartySignInUpInput) {
    // TODO: Some pre sign in / up logic
    console.log('🎯thirdPartySignInUp');

    // firewall
    // if (!input.email.endsWith('@smartdaily.com.tw')) {
    //   throw new Error(
    //     `Your Email:${input.email},But email Domain must be end with @smartdaily.com.tw`,
    //   );
    // }

    // Login
    const response = await originalImplementation.thirdPartySignInUp(input);

    if (response.status === 'OK') {
      const { thirdPartyId, rawUserInfoFromProvider } = input;
      const { fromUserInfoAPI } = rawUserInfoFromProvider;
      const thirdPartyUserId = response.user.id;
      const email = fromUserInfoAPI?.['account'] || fromUserInfoAPI?.['email'];

      // SmartDaily:account, Google:email
      let bugMasterUser = await authService.findOneUserBy({
        thirdPartyUserId,
      });
      if (!bugMasterUser) {
        bugMasterUser = await authService.createUserAndApiToken({
          account: email,
          userName: fromUserInfoAPI.name || email.split('@')[0],
          supertokensThirdPartyId: thirdPartyId,
          supertokensThirdPartyUserId: thirdPartyUserId,
        });
      }

      // if (
      //   response.createdNewRecipeUser &&
      //   response.user.loginMethods.length === 1
      // ) {
      //   // TODO: some post sign up logic　註冊
      // } else {
      //   // TODO: some post sign in logic　登入
      // }

      if (email && thirdPartyId === ThirdParty.SmartDaily) {
        const _userInfo =
          rawUserInfoFromProvider.fromUserInfoAPI as FromUserInfoAPIBySmartDailyType;
        // Keep UserInfo to metadata
        await UserMetadata.updateUserMetadata(thirdPartyUserId, {
          bug_master_user_id: bugMasterUser.id,
          user_id: `${bugMasterUser.mantisbtUserId}`,
          account: email,
          account_type: _userInfo.account_type,
          name: bugMasterUser.userName,
          first_name: _userInfo.first_name,
          last_name: _userInfo.last_name,
        } as metaDataType);
      }

      if (email && thirdPartyId === ThirdParty.Google) {
        const _userInfo =
          rawUserInfoFromProvider.fromUserInfoAPI as FromUserInfoAPIFromGoogleType;
        // Keep UserInfo to metadata
        await UserMetadata.updateUserMetadata(thirdPartyUserId, {
          bug_master_user_id: bugMasterUser.id,
          user_id: _userInfo.sub,
          account: email,
          account_type: 1,
          name: _userInfo.name,
          first_name: _userInfo?.given_name || email.split('@')[0],
          last_name: _userInfo?.family_name,
        } as metaDataType);
      }
    }

    return response;
  };
};

export default thirdPartySignInUp;
