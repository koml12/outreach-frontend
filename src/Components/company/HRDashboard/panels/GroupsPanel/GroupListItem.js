import React, { Component } from "react";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

class GroupListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      event: props.event,
      evaluator: props.evaluator,
      candidates: props.candidates,
    };
  }

  render() {
    return (
      <ExpansionPanel expanded={this.props.expanded} onChange={this.props.onExpandedChange}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">{this.props.name}</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    );
  }
}

export default GroupListItem;
