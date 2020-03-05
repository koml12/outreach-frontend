import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const RegistrationSwitch = props => (
  <Grid container>
    <Grid item xs={3} />
    <Grid item xs={9}>
      <Link component="button" onClick={props.onRegisterSwitch}>
        {props.isRegistering ? "Already have an account? Log in here." : "Don't have an account? Register here."}
      </Link>
    </Grid>
  </Grid>
);

export default RegistrationSwitch;
