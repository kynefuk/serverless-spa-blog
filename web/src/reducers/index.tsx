import { AccessTokenAction, ErrorAction, LoadingAction } from "../action/index";
import {
  AccessTokenActionType,
  ErrorActionType,
  LoadingActionType,
} from "../action/type";

export const AccessTokenReducer = (
  state: string = "",
  action: AccessTokenAction
) => {
  switch (action.type) {
    case AccessTokenActionType.ADD_TOKEN:
      const access = action.payload;
      localStorage.setItem("access", access);
      return access;
    case AccessTokenActionType.DELETE_TOKEN:
      localStorage.removeItem("access");
      return state;
    default:
      return state;
  }
};

export const ErrorReducer = (state: string = "", action: ErrorAction) => {
  switch (action.type) {
    case ErrorActionType.ADD_ERROR:
      const error = action.payload;
      localStorage.setItem("error", error);
      return error;
    case ErrorActionType.DELETE_ERROR:
      localStorage.removeItem("error");
      return state;
    default:
      return state;
  }
};

export const LoadingReducer = (
  state: boolean = false,
  action: LoadingAction
) => {
  switch (action.type) {
    case LoadingActionType.LOADING_TRUE:
      localStorage.setItem("loading", true.toString());
      return true;
    case LoadingActionType.LOADING_FALSE:
      localStorage.setItem("loading", false.toString());
      return false;
    default:
      return state;
  }
};
