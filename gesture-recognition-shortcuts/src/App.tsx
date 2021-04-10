import * as React from "react";
import {AppBar, Toolbar, IconButton, Typography, makeStyles} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import logo from "./logo.svg";
import "./App.css";
import { render } from "react-dom";
import { popupOpen } from "./background";


interface AppProps {
}

class App extends React.Component<AppProps> {

  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount() {
    popupOpen();
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className="nav-title">
              Gesture Recognition Shortcuts

              <IconButton color="inherit">
                <SettingsIcon />
            </IconButton>
            </Typography>
          </Toolbar>
        </AppBar>
        <img/>
      </div>
    );
  }
}

export {App, AppProps};
