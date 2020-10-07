import { AccessTokenActionType, ErrorActionType } from './type';

export type AccessTokenAction = {
  type: AccessTokenActionType;
  payload: string;
};

export type ErrorAction = {
  type: ErrorActionType;
  payload: string;
};
