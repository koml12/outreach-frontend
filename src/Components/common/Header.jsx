import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

import LogoutButton from "./LogoutButton";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  }
}));

const Header = props => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          {props.company}
        </Typography>
        {props.loggedIn && <LogoutButton />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
