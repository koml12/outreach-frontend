import React, { useState } from "react";

import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import SaveCancelButtons from "./SaveCancelButtons";

const EditingQuestionItem = ({ question, type, onSave, onCancel }) => {
  const [text, setText] = useState(question ? question.text : "");
  const [op1, setOp1] = useState(question ? question.op1 : "");
  const [op2, setOp2] = useState(question ? question.op2 : "");
  const [op3, setOp3] = useState(question ? question.op3 : "");
  const [op4, setOp4] = useState(question ? question.op4 : "");
  const [op5, setOp5] = useState(question ? question.op5 : "");

  const saveQuestion = () => {
    if (type === "questionnaire") {
      onSave({ ...question, text, op1, op2, op3, op4, op5 });
    } else {
      onSave({
        ...question,
        text,
        op1: "Poor",
        op2: "Below Average",
        op3: "Average",
        op4: "Above Average",
        op5: "Excellent",
      });
    }
  };

  return (
    <ListItem>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            label="Question Text"
            size="medium"
            value={text}
            onChange={(e) => setText(e.target.value)}
            inputProps={{ style: { fontSize: "1.25rem" } }}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={2}>
          <SaveCancelButtons onSave={saveQuestion} onCancel={onCancel} />
        </Grid>
        {type === "questionnaire" && (
          <Grid container spacing={2}>
            <Grid item xs={0} />

            <Grid item xs={2}>
              <TextField label="Option 1" value={op1} onChange={(e) => setOp1(e.target.value)} required />
            </Grid>
            <Grid item xs={2}>
              <TextField label="Option 2" value={op2} onChange={(e) => setOp2(e.target.value)} required />
            </Grid>
            <Grid item xs={2}>
              <TextField label="Option 3" value={op3} onChange={(e) => setOp3(e.target.value)} required />
            </Grid>
            <Grid item xs={2}>
              <TextField label="Option 4" value={op4} onChange={(e) => setOp4(e.target.value)} required />
            </Grid>
            <Grid item xs={2}>
              <TextField label="Option 5" value={op5} onChange={(e) => setOp5(e.target.value)} required />
            </Grid>
            <Grid item xs={2} />
          </Grid>
        )}
      </Grid>
      {/* <ListItemSecondaryAction>
        <SaveCancelButtons onSave={saveQuestion} onCancel={onCancel} />
      </ListItemSecondaryAction> */}
    </ListItem>
  );
};

export default EditingQuestionItem;
