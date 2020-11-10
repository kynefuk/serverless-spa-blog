import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import * as serviceWorker from "./serviceWorker";
import { HashRouter, Link } from "react-router-dom";
import { AppContext } from "./context/index";
import { Error } from "./components/Error";

ReactDOM.render(
  <React.StrictMode>
    <AppContext>
      <HashRouter hashType={"slash"}>
        <AppBar
          position="sticky"
          color="default"
          style={{ marginBottom: "50px" }}
        >
          <Toolbar>
            <Typography variant="h6">
              <Link to="/">ブログ</Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Error />
        <Container maxWidth={false}>
          <Grid container>
            <Grid item xs={12}>
              <App />
            </Grid>
          </Grid>
        </Container>
      </HashRouter>
    </AppContext>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
