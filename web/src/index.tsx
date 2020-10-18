import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import * as serviceWorker from './serviceWorker';
import { HashRouter, Link } from 'react-router-dom';
import { AppContext } from './context/index';

ReactDOM.render(
  <React.StrictMode>
    <AppContext>
      <HashRouter hashType={'slash'}>
        <AppBar
          position='sticky'
          color='default'
          style={{ marginBottom: '50px' }}
        >
          <Toolbar>
            <Typography variant='h6'>
              <Link to='/'>ブログ</Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <App />
      </HashRouter>
    </AppContext>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
