import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  footer: {
    // bottom: "0",
    // height: "10px",
    // left: "0",
    // position: "absolute",
    // width: "100%",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Typography variant="body2" className={classes.footer}>
      Brought to you by OutRecruit.
    </Typography>
  );
};

export default Footer;
