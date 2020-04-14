import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const QuestionnaireCard = (props) => {
  const { name, type, events, onEditClicked, onDeleteClicked, onViewDetailsClicked } = props;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={0}>
          <Grid item xs={11}>
            <Typography variant="h5" color="textPrimary">
              {name}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={onEditClicked}>
              <EditIcon fontSize="small" color="primary" />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              {type === "questionnaire" ? "Candidate Questions" : "Evaluation Questions"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Used in {events.length} events
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container spacing={0} style={{ marginRight: "7px" }}>
          <Grid item xs={11}>
            <Button color="primary" onClick={onViewDetailsClicked}>
              View Questions
            </Button>
          </Grid>
          <Grid item xs={1}>
            <IconButton onClick={onDeleteClicked}>
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default QuestionnaireCard;
