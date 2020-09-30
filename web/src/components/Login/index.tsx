import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { DefaultApi } from '../../api/api';
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
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useAccessTokenContext } from '../../context/index';
import { AccessTokenActionType } from '../../action/type';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const api = new DefaultApi();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatchAccessToken } = useAccessTokenContext();

  const changeUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setUsername(value);
  };

  const changePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setPassword(value);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const response = await api.loginForAccessTokenTokenPost(username, password);
    dispatchAccessToken({
      type: AccessTokenActionType.ADD,
      payload: response.data.access_token,
    });

    history.push('/');
  };

  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              changeUsernameInput(e)
            }
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              changePasswordInput(e)
            }
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={(e: React.FormEvent<HTMLButtonElement>) =>
              handleOnSubmit(e)
            }
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
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
