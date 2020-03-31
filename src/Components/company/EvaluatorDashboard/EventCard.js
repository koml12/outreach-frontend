import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const EventCard = props => (
  <Card>
    <CardContent>
      <Typography variant="h6" color="textPrimary">
        {props.title}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {props.description}
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
