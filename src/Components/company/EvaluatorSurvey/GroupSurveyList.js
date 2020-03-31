import React from "react";

import CandidateSurveyEntry from "./CandidateSurveyEntry";

const GroupSurveyList = props => {
  return (
    <div>
      <h2>Group {props.groupId}</h2>
      {props.candidates.map(candidate => (
        <CandidateSurveyEntry
          firstName={candidate["first_name"]}
          lastName={candidate["last_name"]}
          eventId={props.eventId}
        />
      ))}
    </div>
  );
};

export default GroupSurveyList;
