import React, { Component } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";

import { generateDateString } from "../../../../../utils/utils";

import EventCard from "../EventCard";
import EventGroupDetail from "./EventGroupDetail";

class GroupsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      selectedEvent: null,
    };
    this.getEvents = this.getEvents.bind(this);
    this.handleEventClicked = this.handleEventClicked.bind(this);
    this.handleBackButtonClicked = this.handleBackButtonClicked.bind(this);
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/event/",
    }).then((response) => {
      const events = response.data;
      this.setState({ events });
    });
  }

  handleEventClicked(eventId) {
    let selectedEvent = this.state.events.find((event) => event.id === eventId);
    this.setState({ selectedEvent });
  }

  handleBackButtonClicked() {
    this.setState({ selectedEvent: null });
  }

  render() {
    return (
      <div>
        {this.state.selectedEvent !== null ? (
          <EventGroupDetail event={this.state.selectedEvent} onBackClicked={this.handleBackButtonClicked} />
        ) : (
          <Grid container spacing={2}>
            {this.state.events.map((event) => (
              <Grid item xs={4}>
                <EventCard
                  id={event["id"]}
                  title={event["Event Name"]}
                  description={event["Description"]}
                  startDatetime={generateDateString(event["Start Time"])}
                  endDatetime={generateDateString(event["End Time"])}
                  onButtonClicked={() => this.handleEventClicked(event.id)}
                  key={`event-${event.id}`}
                  constant
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    );
  }
}

export default GroupsPanel;
