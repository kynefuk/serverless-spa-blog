import React from 'react';
import 'easymde/dist/easymde.min.css';
import marked from 'marked';
import highlight from 'highlightjs';
import 'highlightjs/styles/docco.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Editor from './components/Editor';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import Auth from './components/Auth';

marked.setOptions({
  highlight: function (code, lang) {
    return highlight.highlightAuto(code, [lang]).value;
  },
});

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={BlogList} />
        <Route path='/:id' exact component={Blog} />
        <Auth>
          <Switch>
            <Route path='/:id/edit' exact component={Editor} />
            <Route path='/create' exact component={Editor} />
          </Switch>
        </Auth>
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;

/* <SimpleMED onChange={(e) => setMarkdown(e)} />
  <div id='body'>
    <span dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
  </div> */
