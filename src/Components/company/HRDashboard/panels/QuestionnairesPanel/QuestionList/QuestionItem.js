import React from "react";

import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import EditDeleteButtons from "../../EditDeleteButtons";

const QuestionItem = ({ question, type, onEditClicked, onDeleteClicked }) => {
  return (
    <ListItem>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h6" display="block" noWrap>
            {question.text}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <EditDeleteButtons onEdit={onEditClicked} onDelete={onDeleteClicked} />
        </Grid>
        {type === "questionnaire" && (
          <Grid container spacing={2} style={{ marginLeft: "5px" }}>
            <Grid item xs={2}>
              <Typography variant="body1" display="block" noWrap>
                {question.op1}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" display="block" noWrap>
                {question.op2}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" display="block" noWrap>
                {question.op3}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" display="block" noWrap>
                {question.op4}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" display="block" noWrap>
                {question.op5}
              </Typography>
            </Grid>
            <Grid item xs={2} />
          </Grid>
        )}
      </Grid>
      {/* <ListItemSecondaryAction>
        <EditDeleteButtons onEdit={onEditClicked} onDelete={onDeleteClicked} />
        <IconButton onClick={onEditClicked}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onDeleteClicked={onDeleteClicked}>
          <DeleteIcon color="secondary" />
        </IconButton>
      </ListItemSecondaryAction> */}
    </ListItem>
  );
};

export default QuestionItem;
