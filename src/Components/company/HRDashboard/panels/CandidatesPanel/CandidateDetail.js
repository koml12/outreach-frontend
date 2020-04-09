import React from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RegisteredEvents from "./RegisteredEvents";

const CandidateDetail = (props) => {
  const { candidate, registrations } = props;

  const resumeId = registrations && registrations.length > 0 ? registrations[0].resume : null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <Typography variant="body1" color={resumeId !== null ? "textPrimary" : "error"}>
          {resumeId !== null ? "Candidate uploaded resume" : "Resume not uploaded yet"}
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Button variant="outlined" color="primary">
          Text Candidate
        </Button>
      </Grid>

      <Grid item xs={12}>
        <RegisteredEvents registrations={registrations} />
      </Grid>
    </Grid>
  );
};

export default CandidateDetail;
