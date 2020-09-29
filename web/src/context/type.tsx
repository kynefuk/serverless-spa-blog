import { AccessTokenAction } from '../action/index';

export type AccessTokenContextType = {
  access: string;
  dispatchAccessToken: React.Dispatch<AccessTokenAction>;
};
