import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const CandidateCheckList = (props) => {
  const { registrations, selectedRegistrations, onRegistrationSelected } = props;

  console.log(registrations);

  return (
    <div>
      <Typography variant="subtitle1">
        <Box fontWeight="fontWeightBold">Select Candidates</Box>
      </Typography>
      <List>
        {registrations.map((registration) => (
          <ListItem dense button onClick={() => onRegistrationSelected(registration)}>
            <ListItemIcon>
              <Checkbox checked={selectedRegistrations.includes(registration)} />
            </ListItemIcon>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  {registration.candidate["first_name"]} {registration.candidate["last_name"]}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box fontStyle="italic">
                  <Typography variant="body1">{registration.candidate["email"]}</Typography>
                </Box>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CandidateCheckList;
