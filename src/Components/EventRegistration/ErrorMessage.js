import React from "react";
import Typography from "@material-ui/core/Typography";

const ErrorMessage = props => (
  <Typography variant="body2" color="error">
    {props.message}
  </Typography>
);

export default ErrorMessage;
