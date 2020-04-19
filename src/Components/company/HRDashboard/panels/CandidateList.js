import React from "react";

import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const CandidateList = (props) => {
  const { candidates, expandedCandidate, onExpandedChange, details, onDetailChange } = props;

  const DetailComponent = props.detailComponent;

  return (
    <Grid item xs={12}>
      {candidates.map((candidate, index) => {
        return (
          <ExpansionPanel
            expanded={expandedCandidate === candidate}
            onChange={() => onExpandedChange(candidate)}
            key={`candidate-${candidate.id}`}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="h5">
                    {candidate["first_name"]} {candidate["last_name"]}
                  </Typography>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={6}>
                  <Typography variant="h6" color="textSecondary">
                    {candidate["email"]}
                  </Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <DetailComponent {...details[index]} {...onDetailChange} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </Grid>
  );
};

export default CandidateList;
