import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const AutoDivideGroupsButton = (props) => (
  <Grid container justify="center" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
    <Button variant="contained" color="primary" onClick={props.onClick}>
      Assign Candidates Automatically
    </Button>
  </Grid>
);

export default AutoDivideGroupsButton;
