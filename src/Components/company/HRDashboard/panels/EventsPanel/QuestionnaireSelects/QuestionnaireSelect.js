import React from "react";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";

const QuestionnaireSelect = ({ questionnaires, selectedQuestionnaire, label, onChange }) => {
  return (
    <Tooltip title="Changing this will delete saved answers. Be careful!">
      <TextField
        label={label}
        value={selectedQuestionnaire}
        onChange={(e) => onChange(e.target.value)}
        select
        fullWidth
      >
        {questionnaires.map((questionnaire) => (
          <MenuItem key={questionnaire.name} value={questionnaire.id}>
            {questionnaire.name}
          </MenuItem>
        ))}
      </TextField>
    </Tooltip>
  );
};

export default QuestionnaireSelect;
