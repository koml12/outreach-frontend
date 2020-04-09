import React from "react";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";

import CandidateEventInfo from "./CandidateEventInfo";

const RegisteredEvents = (props) => {
  const { registrations } = props;

  return (
    <div>
      <Typography variant="h6">Events:</Typography>
      <List>
        {registrations &&
          registrations.map((registration) => (
            <CandidateEventInfo event={registration.event} group={registration.group} />
          ))}
      </List>
    </div>
  );
};

export default RegisteredEvents;
