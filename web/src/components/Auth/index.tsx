import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { DefaultApi } from '../../api/api';
import { useAccessTokenContext } from '../../context/index';

const Auth: React.FC = ({ children }) => {
  const api = new DefaultApi();
  const history = useHistory();
  const { access } = useAccessTokenContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.verifyAccessTokenTokenVerifyPost({
          access_token: access,
        });
      } catch (err) {
        history.push('/login');
      }
    };

    fetchData();
  }, []);

  return <div>{children}</div>;
};

export default Auth;
