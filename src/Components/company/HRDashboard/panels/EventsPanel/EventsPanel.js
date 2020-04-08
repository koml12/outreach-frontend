import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import { generateDateString, getToken } from "../../../../../utils/utils";
import EventCard from "./EventCard";
import EventDetail from "./EventDetail";
import AddEventModal from "./AddEventModal";
import AddEventButton from "./AddEventButton";
import DeleteEventModal from "./DeleteEventModal";

class EventsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      selectedEvent: null,
      modifyingEvent: null,
      showEventModal: false,
      showDeleteModal: false,
    };
    this.refreshEvents = this.refreshEvents.bind(this);
    this.handleEventClicked = this.handleEventClicked.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.handleAddEventClicked = this.handleAddEventClicked.bind(this);
    this.handleAddEventClosed = this.handleAddEventClosed.bind(this);
    this.handleEventSubmit = this.handleEventSubmit.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.handleEditEvent = this.handleEditEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.handleDeleteEventClosed = this.handleDeleteEventClosed.bind(this);
  }

  componentDidMount() {
    this.refreshEvents();
  }

  refreshEvents() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/event/",
    }).then((response) => {
      console.log(response.data);
      this.setState({ events: response.data });
    });
  }

  handleEventClicked(eventId) {
    console.log("Event ", eventId, " clicked");
    let selectedEvent = this.state.events.find((event) => event.id === eventId);
    this.setState({ selectedEvent });
  }

  handleEditEvent(eventId) {
    let modifyingEvent = this.state.events.find((event) => event.id === eventId);
    this.setState({ modifyingEvent, showEventModal: true });
  }

  handleDeleteEvent(eventId) {
    let modifyingEvent = this.state.events.find((event) => event.id === eventId);
    this.setState({ modifyingEvent, showDeleteModal: true });
  }

  handleBackButtonClick() {
    this.setState({ selectedEvent: null });
  }

  handleAddEventClicked() {
    this.setState({ showEventModal: true });
  }

  handleAddEventClosed() {
    this.setState({ showEventModal: false, modifyingEvent: null });
  }

  handleDeleteEventClosed() {
    this.setState({ showDeleteModal: false, modifyingEvent: null });
  }

  handleEventSubmit(event) {
    this.handleAddEventClosed();
    axios({
      method: event.id ? "patch" : "post",
      url: `http://localhost:8000/api/event${event.id ? "/" + event.id : ""}/`,
      data: event,
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then((response) => {
      let events = [];
      if (event.id) {
        const foundIndex = this.state.events.findIndex((e) => e.id === event.id);
        events = [...this.state.events.slice(0, foundIndex), response.data, ...this.state.events.slice(foundIndex + 1)];
      } else {
        events = [...this.state.events, response.data];
      }
      this.setState({ events, modifyingEvent: null });
    });
  }

  deleteEvent(eventId) {
    this.handleDeleteEventClosed();
    axios({
      method: "delete",
      url: `http://localhost:8000/api/event/${eventId}/`,
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then((response) => {
      const foundIndex = this.state.events.findIndex((e) => e.id === eventId);
      const events = [...this.state.events.slice(0, foundIndex), ...this.state.events.slice(foundIndex + 1)];
      this.setState({ events, modifyingEvent: null });
    });
  }

  render() {
    return (
      <div>
        {this.state.selectedEvent !== null ? (
          <EventDetail event={this.state.selectedEvent} onBackClicked={this.handleBackButtonClick} />
        ) : (
          <div>
            {this.state.showEventModal && (
              <AddEventModal
                open={this.state.showEventModal}
                event={this.state.modifyingEvent}
                onClose={this.handleAddEventClosed}
                onSubmit={this.handleEventSubmit}
              />
            )}

            {this.state.modifyingEvent !== null && (
              <DeleteEventModal
                open={this.state.showDeleteModal}
                title={this.state.modifyingEvent["Event Name"]}
                onClose={this.handleDeleteEventClosed}
                onDelete={() => this.deleteEvent(this.state.modifyingEvent.id)}
              />
            )}

            <Grid container spacing={2}>
              {this.state.events.map((event) => (
                <Grid item xs={4} key={`event-${event.id}`}>
                  <EventCard
                    id={event["id"]}
                    title={event["Event Name"]}
                    description={event["Description"]}
                    startDatetime={generateDateString(event["Start Time"])}
                    endDatetime={generateDateString(event["End Time"])}
                    onButtonClicked={() => this.handleEventClicked(event.id)}
                    onDeleteClicked={() => this.handleDeleteEvent(event.id)}
                    onEditClicked={() => this.handleEditEvent(event.id)}
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
