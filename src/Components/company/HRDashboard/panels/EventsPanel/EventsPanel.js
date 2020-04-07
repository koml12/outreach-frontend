import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import { generateDateString, getToken } from "../../../../../utils/utils";
import EventCard from "./EventCard";
import EventDetail from "./EventDetail";
import AddEventModal from "./AddEventModal";
import AddEventButton from "./AddEventButton";

class EventsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      selectedEvent: null,
      addEventOpen: false,
    };
    this.refreshEvents = this.refreshEvents.bind(this);
    this.handleEventClicked = this.handleEventClicked.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleAddEventClicked = this.handleAddEventClicked.bind(this);
    this.handleAddEventClosed = this.handleAddEventClosed.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
  }

  componentDidMount() {
    this.refreshEvents();
  }

  refreshEvents() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/event",
    }).then((response) => {
      console.log(response.data);
      let events = response.data;
      this.setState({ events });
    });
  }

  handleEventClicked(eventId) {
    console.log("Event ", eventId, " clicked");
    let selectedEvent = this.state.events.find((event) => event.id === eventId);
    console.log(selectedEvent);
    this.setState({ selectedEvent });
  }

  handleBackButtonClick() {
    this.setState({ selectedEvent: null });
  }

  handleAddEventClicked() {
    this.setState({ addEventOpen: true });
  }

  handleAddEventClosed() {
    this.setState({ addEventOpen: false });
  }

  handleEventSubmit(event) {
    this.handleAddEventClosed();
    axios({
      method: "post",
      url: "http://localhost:8000/api/event/",
      data: event,
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then(this.refreshEvents());
  }

  render() {
    return (
      <div>
        {this.state.selectedEvent !== null ? (
          <EventDetail event={this.state.selectedEvent} onBackClicked={this.handleBackButtonClick} />
        ) : (
          <div>
            <AddEventModal
              open={this.state.addEventOpen}
              onClose={this.handleAddEventClosed}
              onSubmit={this.handleEventSubmit}
            />
            <Grid container spacing={2}>
              {this.state.events.map((event) => (
                <Grid item xs={4} key={`event-${event.id}`}>
                  <EventCard
                    title={event["Event Name"]}
                    description={event["Description"]}
                    startDatetime={generateDateString(event["Start Time"])}
                    endDatetime={generateDateString(event["End Time"])}
                    onButtonClicked={() => this.handleEventClicked(event.id)}
                    key={`event-${event.id}`}
                  />
                </Grid>
              ))}
            </Grid>
            <AddEventButton onClick={this.handleAddEventClicked} />
          </div>
        )}
      </div>
    );
  }
}

export default EventsPanel;
