import SuperTokens from 'supertokens-node';
import type { RecipeInterface } from 'supertokens-node/recipe/session';
import RecipeUserId from 'supertokens-node/lib/build/recipeUserId';
import { AuthService } from '../../../auth.service';

type InputType = {
  userId: string;
  recipeUserId: RecipeUserId;
  accessTokenPayload: {
    [key: string]: any;
  };
  sessionDataInDatabase?: any;
  disableAntiCsrf?: boolean;
  tenantId: string; // public
  userContext: any;
};

// type BodyDataType = {
//   redirectURIInfo: {
//     redirectURIQueryParams: {
//       [key: string]: any;
//       authorizeInfo: SmartDailyAccessTokenInfoType;
//       user: SmartDailyOAuthUserType;
//     };
//   };
// };
const createNewSession = (
  originalImplementation: RecipeInterface,
  authService: AuthService,
) => {
  return async function (input: InputType) {
    console.log('🎯createNewSession');
    console.log('input');
    console.log(input);
    const request = SuperTokens.getRequestFromUserContext(input.userContext);
    console.log('request');
    console.log(request);
    // const bodyData: BodyDataType = await request?.getJSONBody();

    // if ('authorizeInfo' in bodyData.redirectURIInfo.redirectURIQueryParams) {
    //   const { authorizeInfo, user } =
    //     bodyData.redirectURIInfo.redirectURIQueryParams;
    //   input.accessTokenPayload.smartDaily = {
    //     ...authorizeInfo,
    //     ...user,
    //   };
    // }

    // console.log('bodyData.redirectURIInfo;');
    // console.log(bodyData.redirectURIInfo);
    // console.log('bodyData.redirectURIInfo.redirectURIQueryParams;');
    // console.log(bodyData.redirectURIInfo.redirectURIQueryParams);

    const user = await authService.findOneUserBy({
      id: +input.userId,
    });

    if (user) {
      input.accessTokenPayload = {
        ...input.accessTokenPayload,
        bugMasterUser: {
          id: user.id,
          userId: user.mantisbtUserId,
          thirdPartyId: user.supertokensThirdPartyId,
        },
      };
    }

    return originalImplementation.createNewSession(input);
  };
};

export default createNewSession;
