import React from "react";

import Typography from "@material-ui/core/Typography";

const QuestionnaireInfo = ({ name, type, events }) => {
  return (
    <div>
      <Typography variant="h4" align="center">
        {name && name}
      </Typography>
      <Typography variant="h5" align="center">
        {type && type === "questionnaire" ? "Candidate Questions" : "Evaluation Questions"}
      </Typography>
      <Typography variant="body1" align="center">
        Used in {events && events.length} event{events && events.length !== 1 && "s"}
      </Typography>
    </div>
  );
};

export default QuestionnaireInfo;
