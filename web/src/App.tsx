import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Editor from './components/Editor';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import Auth from './components/Auth';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/' exact component={BlogList} />
        <Route path='/:id(\d+)' exact component={Blog} />
        <Auth>
          <Switch>
            <Route path='/:id(\d+)/edit' exact component={Editor} />
            <Route path='/create' exact component={Editor} />
          </Switch>
        </Auth>
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
