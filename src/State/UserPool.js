import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.APP_CLIENT_ID,
};

export default new CognitoUserPool(poolData);
