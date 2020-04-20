import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EditDeleteButtons from "../EditDeleteButtons";

const JobDetail = (props) => {
  const { description, onEdit, onDelete } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <Typography>{description}</Typography>
      </Grid>
      <Grid item xs={2}>
        <EditDeleteButtons onEdit={onEdit} onDelete={onDelete} />
      </Grid>
    </Grid>
  );
};

export default JobDetail;
