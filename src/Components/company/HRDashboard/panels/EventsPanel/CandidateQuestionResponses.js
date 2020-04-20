import React from "react";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CandidateQuestionResponses = ({ savedAnswers }) => {
  return (
    <div>
      <Typography variant="h6">Candidate Questions:</Typography>
      <List>
        {savedAnswers.map((savedAnswer) => (
          <ListItem divider key={`answer-${savedAnswer.id}`}>
            <FormControl component="fieldset">
              <FormLabel>
                <Typography variant="body1" color="textPrimary">
                  {savedAnswer.question.text}
                </Typography>
              </FormLabel>
              <RadioGroup value={savedAnswer.answer}>
                <FormControlLabel value={0} label={savedAnswer.question.op1} control={<Radio size="small" />} />
                <FormControlLabel value={1} label={savedAnswer.question.op2} control={<Radio size="small" />} />
                <FormControlLabel value={2} label={savedAnswer.question.op3} control={<Radio size="small" />} />
                <FormControlLabel value={3} label={savedAnswer.question.op4} control={<Radio size="small" />} />
                <FormControlLabel value={4} label={savedAnswer.question.op5} control={<Radio size="small" />} />
              </RadioGroup>
            </FormControl>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CandidateQuestionResponses;
