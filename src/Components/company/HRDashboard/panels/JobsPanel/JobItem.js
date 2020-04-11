import React from "react";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import JobDetail from "./JobDetail";

const JobItem = (props) => {
  const { title, description, expanded, onExpandedChange, onEdit, onDelete } = props;
  return (
    <ExpansionPanel expanded={expanded} onChange={onExpandedChange}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <JobDetail description={description} onEdit={onEdit} onDelete={onDelete} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default JobItem;
