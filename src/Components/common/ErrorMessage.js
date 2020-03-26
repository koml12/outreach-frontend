import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const ErrorMessage = props => (
  <Grid container spacing={2}>
    <Grid item xs={props.offset === undefined ? 0 : props.offset} />
    <Grid item xs={props.offset === undefined ? 12 : 12 - props.offset}>
      <Typography variant="body2" color="error">
        {props.message}
      </Typography>
    </Grid>
  </Grid>
);

export default ErrorMessage;
