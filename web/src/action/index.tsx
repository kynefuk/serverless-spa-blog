import { AccessTokenActionType } from './type';

export type AccessTokenAction = {
  type: AccessTokenActionType;
  payload: string;
};
