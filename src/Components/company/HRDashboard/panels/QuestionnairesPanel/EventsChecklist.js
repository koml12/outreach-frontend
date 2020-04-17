import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const EventsChecklist = (props) => {
  const { events, selectedEvents, onEventSelected } = props;

  return (
    <div>
      <Typography variant="subtitle1">
        <Box fontWeight="fontWeightBold">Select Events to Associate With</Box>
      </Typography>
      <List>
        {events.map((event) => (
          <ListItem dense button onClick={() => onEventSelected(event)}>
            <ListItemIcon>
              <Checkbox checked={selectedEvents && selectedEvents.includes(event)} />
            </ListItemIcon>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="body1">{event["Event Name"]}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default EventsChecklist;
