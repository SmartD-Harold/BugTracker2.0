import { AuthModuleConfigType } from './supertokens.config.interface';

export const ThirdParty = {
  Google: 'google',
  SmartDaily: 'smart-daily',
};

export const TargetSmartDailyAPI =
  'https://knst-enterprise-api-dev.kingnetsmart.com.tw';
export const AuthorizationEndpointOfSmartDaily = `${TargetSmartDailyAPI}/Auth/Authorize`;

export const ThirdPartyConfigOfSmartDaily = {
  thirdPartyId: ThirdParty.SmartDaily,
  name: ThirdParty.SmartDaily,
};

export const SuperTokensConfig: AuthModuleConfigType = {
  connectionURI: 'http://127.0.0.1:3567',
  // apiKey: <API_KEY(if configured)>,
  appInfo: {
    appName: 'bug_tracker',
    apiDomain: 'https://localhost:3000',
    apiBasePath: '/auth',
    // 參考： https://kingnetrd.visualstudio.com/RD-ProjectTemplate/_git/RD-ProjectTemplate_v2
    websiteDomain: 'https://localhost:9528', // Port預設為 9528, 這有在SmartDaily OAuth後端資料庫設定過, 使用其他的 Port 將無法正常運行
    websiteBasePath: '/auth',
  },
};

// Max Limit: 3 accounts
type DashboardConfigType = [string, string?, string?];

// http://127.0.0.1:3000/auth/dashboard
// supertokens@smartdaily.com.tw / supertokens5364

export const DashboardConfig: DashboardConfigType = [
  'supertokens@smartdaily.com.tw',
];
