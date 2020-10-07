import { AccessTokenAction, ErrorAction } from '../action/index';
import { AccessTokenActionType, ErrorActionType } from '../action/type';

export const AccessTokenReducer = (
  state: string = '',
  action: AccessTokenAction
) => {
  switch (action.type) {
    case AccessTokenActionType.ADD:
      console.log(state);
      const access = action.payload;
      localStorage.setItem('access', access);
      return access;
    case AccessTokenActionType.DELETE:
      localStorage.removeItem('access');
      return state;
    default:
      return state;
  }
};

export const ErrorReducer = (state: string = '', action: ErrorAction) => {
  switch (action.type) {
    case ErrorActionType.ADD:
      const error = action.payload;
      localStorage.setItem('error', error);
      return error;
    case ErrorActionType.DELETE:
      localStorage.removeItem('error');
      return state;
    default:
      return state;
  }
};
