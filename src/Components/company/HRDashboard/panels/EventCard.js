import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  deleteButton: {},
});

const EventCard = (props) => {
  const { constant } = props;
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Grid container spacing={0}>
          <Grid item xs={11}>
            <Typography variant="h4" color="textPrimary">
              {props.title}
            </Typography>
          </Grid>

          <Grid item xs={1}>
            {!constant && (
              <IconButton onClick={props.onEditClicked}>
                <EditIcon fontSize="small" color="primary" />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" color="textSecondary">
              {props.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              Starts: {props.startDatetime}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              Ends: {props.endDatetime}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Link href={`http://localhost:3000/events/${props.id}`} target="_blank">
              Candidate Link
            </Link>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container spacing={0} justify="space-around">
          <Grid item xs={11}>
            <Button color="primary" onClick={props.onButtonClicked}>
              View Details
            </Button>
          </Grid>
          <Grid item xs={1}>
            {!constant && (
              <IconButton className={classes.deleteButton} onClick={props.onDeleteClicked}>
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default EventCard;
