import { ThirdPartyConfigOfSmartDaily } from '../../../../types/supertokens.constants';
import {
  FromUserInfoAPIBySmartDailyType,
  OAuthTokensType,
} from '../../types/thirdPartEmailPassword.interface';

type InputType = { oAuthTokens: OAuthTokensType; userContext: any };

// docs: https://supertokens.com/docs/nodejs/modules/recipe_thirdparty.html
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getUserInfo = () => {
  return async function (input: InputType) {
    console.log('🎯getUserInfo');
    // Call provider's APIs to get profile info
    const { user } = input.oAuthTokens;
    const [lastName = 'NoLastName', ...firstName] = user.name;

    const { account: userEmail } = user;
    const fromUserInfoAPI: FromUserInfoAPIBySmartDailyType = {
      name: user.name,
      user_id: user.id,
      account: userEmail,
      account_type: user.accountType,
      first_name: firstName
        ? Array.isArray(firstName)
          ? firstName.join('')
          : firstName
        : 'NoFirstName',
      last_name: lastName,
    };
    return {
      thirdPartyId: ThirdPartyConfigOfSmartDaily.thirdPartyId,
      thirdPartyUserId: userEmail,
      email: {
        id: userEmail,
        isVerified: true,
      },
      rawUserInfoFromProvider: {
        fromUserInfoAPI,
      },
    };
  };
};

export default getUserInfo;
