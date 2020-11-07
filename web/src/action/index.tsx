import {
  AccessTokenActionType,
  ErrorActionType,
  LoadingActionType,
} from "./type";

export type AccessTokenAction = {
  type: AccessTokenActionType;
  payload: string;
};

export type ErrorAction = {
  type: ErrorActionType;
  payload: string;
};

export type LoadingAction = {
  type: LoadingActionType;
  payload: boolean;
};
