import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  submit: {
    marginLeft: "45%"
  }
});

const UploadButton = props => {
  const classes = useStyles();
  return (
    <Button variant="outlined" color="primary" className={classes.submit} onClick={props.onSubmit}>
      Upload
    </Button>
  );
};

export default UploadButton;
