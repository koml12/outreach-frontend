import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const EventCard = (props) => (
  <Card>
    <CardContent>
      <Typography variant="h4" color="textPrimary">
        {props.title}
      </Typography>
      <Typography variant="h5" color="textSecondary">
        {props.description}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Starts: {props.startDatetime}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Ends: {props.endDatetime}
      </Typography>
    </CardContent>
    <CardActions>
      <Button color="primary" onClick={props.onButtonClicked}>
        View Candidates
      </Button>
    </CardActions>
  </Card>
);

export default EventCard;
