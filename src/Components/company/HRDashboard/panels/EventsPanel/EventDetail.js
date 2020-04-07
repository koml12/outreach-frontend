import React, { Component } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { EventInfo } from "../../../../common/";

export default class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        id: props.event["id"],
        name: props.event["Event Name"],
        description: props.event["Description"],
        startDatetime: props.event["Start Time"],
        endDatetime: props.event["End Time"],
      },
      eventId: props.event.id,
      registrations: [],
      expandedRegistration: null,
    };
    this.handleExpansionChange = this.handleExpansionChange.bind(this);
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `http://localhost:8000/api/registration/`,
    }).then((response) => {
      console.log(response.data);
      let registrations = response.data.filter((registration) => registration.event === this.props.event.id);
      this.setState({ registrations });
    });
  }

  handleExpansionChange(registration) {
    let expandedRegistration = null;
    if (this.state.expandedRegistration !== registration) {
      expandedRegistration = registration;
    }
    this.setState({ expandedRegistration });
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.props.onBackClicked}>
          <ArrowBackTwoToneIcon fontSize="large" />
        </IconButton>
        <EventInfo event={this.state.event} />
        {this.state.registrations.map((registration) => {
          const { candidate } = registration;
          return (
            <ExpansionPanel
              expanded={this.state.expandedRegistration === registration}
              onChange={() => this.handleExpansionChange(registration)}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="h5">
                      {candidate["first_name"]} {candidate["last_name"]}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} />
                  <Grid item xs={6}>
                    <Typography variant="h6" color="textSecondary">
                      {candidate["email"]}
                    </Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails></ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}
