import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { EventSurvey } from "../../Questionnaire";

const CandidateSurveyEntry = props => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h6" color="textPrimary">
        {props.firstName} {props.lastName}
      </Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <EventSurvey eventId={props.eventId} />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);
export default CandidateSurveyEntry;
