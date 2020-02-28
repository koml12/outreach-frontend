import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  footer: {
    position: "fixed",
    bottom: 0
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Typography variant="body2" className={classes.footer}>
      Brought to you by Outreach.
    </Typography>
  );
};

export default Footer;
