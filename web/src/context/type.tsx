import { AccessTokenAction, ErrorAction } from '../action/index';

type AccessTokenContextType = {
  access: string;
  dispatchAccessToken: React.Dispatch<AccessTokenAction>;
};

type ErrorContextType = {
  error: string;
  dispatchErrorMessage: React.Dispatch<ErrorAction>;
};

export type RootContextType = AccessTokenContextType & ErrorContextType;
