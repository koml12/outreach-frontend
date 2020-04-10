import React, { Component } from "react";

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
    event,
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

// class GroupListItem extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: props.id,
//       name: props.name,
//       event: props.event,
//       evaluator: props.evaluator,
//       candidates: props.candidates,
//       registrations =
//     };
//   }

//   render() {
//     return (
//       <ExpansionPanel expanded={this.props.expanded} onChange={this.props.onExpandedChange}>
//         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="h5">{this.props.name}</Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <GroupListDetail />
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//     );
//   }
// }

export default GroupListItem;
