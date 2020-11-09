import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useApi } from "../../hooks/api";
import { useRootContext } from "../../context/index";
import { LoadingActionType, ErrorActionType } from "../../action/type";

const Auth: React.FC = ({ children }) => {
  const api = useApi();
  const history = useHistory();
  const { access, dispatchLoading, dispatchErrorMessage } = useRootContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatchLoading({
          type: LoadingActionType.LOADING_TRUE,
          payload: true,
        });
        await api.verifyAccessTokenTokenVerifyPost({
          access_token: access,
        });
      } catch (err) {
        dispatchErrorMessage({
          type: ErrorActionType.ADD_ERROR,
          payload: err.message,
        });
        history.push("/login");
      } finally {
        dispatchLoading({
          type: LoadingActionType.LOADING_FALSE,
          payload: false,
        });
      }
    };

    fetchData();
  }, [access, api, dispatchErrorMessage, dispatchLoading, history]);

  return <div>{children}</div>;
};

export default Auth;
