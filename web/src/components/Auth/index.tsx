import React from 'react';
import { DefaultApi } from '../../api/api';
import { useAccessTokenContext } from '../../context/index';

const Auth: React.FC = ({ children }) => {
  const api = new DefaultApi();
  const { access, dispatchAccessToken } = useAccessTokenContext();
  return <div>{children}</div>;
};

export default Auth;
