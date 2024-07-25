export type SmartDailyAccessTokenInfoType = {
  accessTokenInfo: {
    accessToken: string;
    createAt: string;
    expiredAt: string;
  };
  refreshTokenInfo: {
    expiredAt: string;
  };
  expiresIn?: number;
};

export type SmartDailyOAuthUserType = {
  account: string;
  accountType: number;
  id: number;
  name: string;
};

export type FromUserInfoAPIBySmartDailyType = {
  name: string;
  user_id: number;
  account: string;
  account_type: number;
  first_name: string;
  last_name: string;
};

export type FromUserInfoAPIFromGoogleType = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
};

export type OAuthTokensType = {
  // follow google oauth 2.0
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  Issued?: string;
  // custom
  create_at?: string;
  expired_at?: string;
  refresh_token_info?: any;
  user?: SmartDailyOAuthUserType;
};
