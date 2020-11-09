import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useApi } from "../../hooks/api";
import {
  Button,
  TextField,
  Avatar,
  Link,
  Grid,
  Typography,
  Container,
  makeStyles,
  CssBaseline,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useRootContext } from "../../context/index";
import {
  AccessTokenActionType,
  ErrorActionType,
  LoadingActionType,
} from "../../action/type";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const api = useApi();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    dispatchAccessToken,
    dispatchErrorMessage,
    dispatchLoading,
  } = useRootContext();

  const changeUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setUsername(value);
  };

  const changePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setPassword(value);
  };

  useEffect(() => {
    dispatchErrorMessage({
      type: ErrorActionType.DELETE_ERROR,
      payload: "",
    });
  }, [dispatchErrorMessage]);

  const handleOnSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      dispatchLoading({
        type: LoadingActionType.LOADING_TRUE,
        payload: true,
      });
      const response = await api.loginForAccessTokenTokenPost(
        username,
        password
      );
      dispatchAccessToken({
        type: AccessTokenActionType.ADD_TOKEN,
        payload: response.data.access_token,
      });

      dispatchErrorMessage({
        type: ErrorActionType.DELETE_ERROR,
        payload: "",
      });

      history.push("/admin/blogs");
    } catch (err) {
      dispatchErrorMessage({
        type: ErrorActionType.ADD_ERROR,
        payload: "認証情報が誤っています",
      });
      console.error(err);
    } finally {
      dispatchLoading({
        type: LoadingActionType.LOADING_FALSE,
        payload: false,
      });
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              changeUsernameInput(e)
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              changePasswordInput(e)
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e: React.FormEvent<HTMLButtonElement>) =>
              handleOnSubmit(e)
            }
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
