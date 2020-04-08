import React from "react";
import Typography from "@material-ui/core/Typography";

const SuccessMessage = props => (
  <Typography variant="body2" color="primary">
    {props.message}
  </Typography>
);

export default SuccessMessage;
