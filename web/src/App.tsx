import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CircularProgress, Backdrop } from "@material-ui/core";
import Login from "./components/Login";
import Editor from "./components/Editor";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import Auth from "./components/Auth";
import Admin from "./components/Admin";
import { useRootContext } from "./context/index";

function App() {
  const { loading } = useRootContext();

  return (
    <div className="App">
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={BlogList} />
        <Route path="/:id(\d+)" exact component={Blog} />
        <Auth>
          <Switch>
            <Route path="/admin/blogs" exact component={Admin} />
            <Route path="/admin/blogs/:id(\d+)/edit" exact component={Editor} />
            <Route path="/admin/blogs/create" exact component={Editor} />
          </Switch>
        </Auth>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
