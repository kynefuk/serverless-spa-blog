import { AccessTokenAction, ErrorAction } from '../action/index';

export type AccessTokenContextType = {
  access: string;
  dispatchAccessToken: React.Dispatch<AccessTokenAction>;
};

export type ErrorContextType = {
  error: string;
  dispatchErrorMessage: React.Dispatch<ErrorAction>;
};
