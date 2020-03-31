import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { getUserId } from "../../../utils/utils";
import Grid from "@material-ui/core/Grid";

import EventCard from "./EventCard";

export default class EvaluatorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      clickedEventId: null
    };
    this.handleEventClicked = this.handleEventClicked.bind(this);
  }

  handleEventClicked(eventId) {
    this.setState({ clickedEventId: eventId });
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `http://localhost:8000/api/group/?evaluator=${getUserId()}`
    }).then(response => {
      let events = response.data
        .map(group => group.event)
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
      this.setState({ events });
      console.log(events);
    });
  }

  render() {
    return (
      <div>
        <h1>Evaluator Dashboard</h1>
        {this.state.events === null ? (
          <p>Loading Events</p>
        ) : (
          <Grid container spacing={2}>
            {this.state.events.map(event => (
              <EventCard
                title={event["Event Name"]}
                description={event["Description"]}
                onButtonClicked={() => this.handleEventClicked(event.id)}
              />
            ))}
          </Grid>
        )}
        {this.state.clickedEventId !== null && <Redirect push to={`/evaluator/events/${this.state.clickedEventId}`} />}
      </div>
    );
  }
}
