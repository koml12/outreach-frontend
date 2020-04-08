import React from "react";
import Typography from "@material-ui/core/Typography";
import { generateDateString } from "../../utils/utils";

const EventInfo = props => (
  <div>
    <Typography variant="h3" align="center">
      {props.event.name}
    </Typography>
    <Typography variant="h5" align="center">
      {props.event.description}
    </Typography>
    <Typography variant="body1" align="center">
      Starts: {generateDateString(props.event.startDatetime)}
    </Typography>
    <Typography variant="body1" align="center" gutterBottom={true}>
      Ends: {generateDateString(props.event.endDatetime)}
    </Typography>
  </div>
);

export default EventInfo;
