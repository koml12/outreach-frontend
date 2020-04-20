import React from "react";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import GroupListDetail from "./GroupListDetail";

const GroupListItem = (props) => {
  const {
    id,
    name,
    evaluator,
    registrations,
    expanded,
    onExpandedChange,
    onRemoveRegistration,
    onEdit,
    onDelete,
  } = props;

  return (
    <ExpansionPanel expanded={expanded} onChange={onExpandedChange}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">{name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <GroupListDetail
          id={id}
          name={name}
          evaluator={evaluator}
          registrations={registrations}
          onRemoveRegistration={onRemoveRegistration}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default GroupListItem;
