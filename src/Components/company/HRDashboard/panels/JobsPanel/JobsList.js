import React, { useState } from "react";

import JobItem from "./JobItem";

const JobsList = (props) => {
  const { jobs, onEditJob, onDeleteJob } = props;

  const [expandedJob, setExpandedJob] = useState(null);

  const onExpandedChange = (job) => {
    if (expandedJob === job) {
      setExpandedJob(null);
    } else {
      setExpandedJob(job);
    }
  };

  const editJob = (job) => {
    onEditJob(job);
  };

  const deleteJob = (job) => {
    onDeleteJob(job);
  };

  return (
    <div>
      {jobs.map((job) => (
        <JobItem
          title={job["Job Title"]}
          description={job["Description"]}
          expanded={job === expandedJob}
          onExpandedChange={() => onExpandedChange(job)}
          onEdit={() => editJob(job)}
          onDelete={() => deleteJob(job)}
        />
      ))}
    </div>
  );
};

export default JobsList;
