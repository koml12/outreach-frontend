import React from "react";

import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import CandidateEventInfo from "./CandidateEventInfo";

const RegisteredEvents = (props) => {
  const { registrations } = props;

  return (
    <div>
      <List>
        {registrations &&
          registrations.length > 0 &&
          registrations.map((registration) => (
            <CandidateEventInfo
              event={registration.event}
              group={registration.group}
              key={`registered-event-${registration.id}`}
            />
          ))}
        {(!registrations || registrations.length === 0) && (
          <Typography variant="h6">This candidate hasn't registered for any events yet</Typography>
        )}
      </List>
    </div>
  );
};

export default RegisteredEvents;
