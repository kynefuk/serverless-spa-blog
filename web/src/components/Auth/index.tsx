import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useApi } from "../../hooks/api";
import { useRootContext } from "../../context/index";

const Auth: React.FC = ({ children }) => {
  const api = useApi();
  const history = useHistory();
  const { access } = useRootContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await api.verifyAccessTokenTokenVerifyPost({
          access_token: access,
        });
      } catch (err) {
        history.push("/login");
      }
    };

    fetchData();
  }, [access, api, history]);

  return <div>{children}</div>;
};

export default Auth;
