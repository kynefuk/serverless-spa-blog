import React, { useContext, useReducer } from "react";
import { RootContextType } from "./type";
import {
  AccessTokenReducer,
  ErrorReducer,
  LoadingReducer,
} from "../reducers/index";
import { combineReducers } from "redux";

export const RootContext = React.createContext<RootContextType>({
  access: "",
  dispatchAccessToken: () => {},
  error: "",
  dispatchErrorMessage: () => {},
  loading: false,
  dispatchLoading: () => {},
});

export const useRootContext = () => {
  return useContext(RootContext);
};

const rootReducer = combineReducers({
  access: AccessTokenReducer,
  error: ErrorReducer,
  loading: LoadingReducer,
});

export const AppContext: React.FC = ({ children }) => {
  const storedAccessToken = localStorage.getItem("access") || "";
  const storedError = localStorage.getItem("error") || "";
  const storedLoading = Boolean(localStorage.getItem("loading")) || false;
  const [state, dispatch] = useReducer(rootReducer, {
    access: storedAccessToken,
    error: storedError,
    loading: storedLoading,
  });

  return (
    <RootContext.Provider
      value={{
        access: state.access,
        error: state.error,
        loading: state.loading,
        dispatchAccessToken: dispatch,
        dispatchErrorMessage: dispatch,
        dispatchLoading: dispatch,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};
