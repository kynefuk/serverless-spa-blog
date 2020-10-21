import React, { useContext, useReducer } from "react";
import { RootContextType } from "./type";
import { AccessTokenReducer, ErrorReducer } from "../reducers/index";
import { combineReducers } from "redux";

export const RootContext = React.createContext<RootContextType>({
  access: "",
  dispatchAccessToken: () => {},
  error: "",
  dispatchErrorMessage: () => {},
});

export const useRootContext = () => {
  return useContext(RootContext);
};

const rootReducer = combineReducers({
  access: AccessTokenReducer,
  error: ErrorReducer,
});

export const AppContext: React.FC = ({ children }) => {
  const storedAccessToken = localStorage.getItem("access") || "";
  const storedError = localStorage.getItem("error") || "";
  const [state, dispatch] = useReducer(rootReducer, {
    access: storedAccessToken,
    error: storedError,
  });

  return (
    <RootContext.Provider
      value={{
        access: state.access,
        error: state.error,
        dispatchAccessToken: dispatch,
        dispatchErrorMessage: dispatch,
      }}
    >
      {children}
    </RootContext.Provider>
  );
};
