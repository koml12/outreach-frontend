import React from "react";

import Grid from "@material-ui/core/Grid";

import QuestionnaireSelect from "./QuestionnaireSelect";

const QuestionnaireSelects = ({
  questionnaires,
  surveys,
  selectedQuestionnaire,
  selectedSurvey,
  onQuestionnaireChange,
  onSurveyChange,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} />

      <Grid item xs={2}>
        <QuestionnaireSelect
          label="Candidate Questions"
          questionnaires={questionnaires}
          selectedQuestionnaire={selectedQuestionnaire}
          onChange={onQuestionnaireChange}
        />
      </Grid>

      <Grid item xs={2}>
        <QuestionnaireSelect
          label="Evaluation Questions"
          questionnaires={surveys}
          selectedQuestionnaire={selectedSurvey}
          onChange={onSurveyChange}
        />
      </Grid>

      <Grid item xs={4} />
    </Grid>
  );
};

export default QuestionnaireSelects;
