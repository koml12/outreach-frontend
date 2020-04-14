import React from "react";

import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

const JobChips = (props) => {
  const { jobs, selectedJob, onJobClicked } = props;

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      <div style={{ display: "inline-block" }}>
        <Typography variant="h6">Best Fit Ranking For:</Typography>
        {jobs.map((job) => (
          <Chip
            label={job["Job Title"]}
            clickable
            onClick={() => onJobClicked(job.id)}
            variant={job === selectedJob ? "default" : "outlined"}
            color={job === selectedJob ? "primary" : "default"}
            style={{ margin: "5px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default JobChips;
