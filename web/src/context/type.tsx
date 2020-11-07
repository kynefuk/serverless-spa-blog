import { AccessTokenAction, ErrorAction, LoadingAction } from "../action/index";

type AccessTokenContextType = {
  access: string;
  dispatchAccessToken: React.Dispatch<AccessTokenAction>;
};

type ErrorContextType = {
  error: string;
  dispatchErrorMessage: React.Dispatch<ErrorAction>;
};

type LoadingContextType = {
  loading: boolean;
  dispatchLoading: React.Dispatch<LoadingAction>;
};

export type RootContextType = AccessTokenContextType &
  ErrorContextType &
  LoadingContextType;
