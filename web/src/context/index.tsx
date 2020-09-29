import React, { useContext, useReducer } from 'react';
import { AccessTokenContextType } from './type';
import { AccessTokenReducer } from '../reducers/index';

export const AccessTokenContext = React.createContext<AccessTokenContextType>({
  access: localStorage.getItem('access') || '',
  dispatchAccessToken: () => {},
});

export const useAccessTokenContext = () => {
  return useContext(AccessTokenContext);
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
