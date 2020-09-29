import { AccessTokenAction } from '../action/index';
import { AccessTokenActionType } from '../action/type';

export const AccessTokenReducer = (
  state: string = '',
  action: AccessTokenAction
) => {
  switch (action.type) {
    case AccessTokenActionType.ADD:
      const access = action.payload;
      localStorage.setItem('access', access);
      return access;
    case AccessTokenActionType.DELETE:
      localStorage.removeItem('access');
      return '';
    default:
      return state;
  }
};
