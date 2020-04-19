import React from "react";

import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

const JobChips = (props) => {
  const { jobs, selectedJob, onJobClicked } = props;

  return (
    <div style={{ textAlign: "center", paddingTop: "20px", paddingBottom: "10px" }}>
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
            key={`job-${job.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default JobChips;
