import React, { useContext, useReducer } from 'react';
import { AccessTokenContextType, ErrorContextType } from './type';
import { AccessTokenReducer, ErrorReducer } from '../reducers/index';

export const AccessTokenContext = React.createContext<AccessTokenContextType>({
  access: localStorage.getItem('access') || '',
  dispatchAccessToken: () => {},
});

export const useAccessTokenContext = () => {
  return useContext(AccessTokenContext);
};

export const ErrorContext = React.createContext<ErrorContextType>({
  error: localStorage.getItem('error') || '',
  dispatchErrorMessage: () => {},
});

export const useErrorContext = () => {
  return useContext(ErrorContext);
};

export const AppContext: React.FC = ({ children }) => {
  const storedAccessToken = localStorage.getItem('access') || '';
  const [access, dispatchAccessToken] = useReducer(
    AccessTokenReducer,
    storedAccessToken
  );
  return (
    <AccessTokenContext.Provider value={{ access, dispatchAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};
