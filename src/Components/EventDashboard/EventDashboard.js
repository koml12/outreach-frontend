import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { userIsLoggedIn } from "../../utils/utils.js";
import EventSignUp from "./EventSignUp";

export default class EventDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.match.params.eventId
    };
  }

  render() {
    if (!userIsLoggedIn("Candidate")) {
      return <Redirect to={`/events/${this.state.eventId}/login`} />;
    } else {
      return (
        <div>
          <EventSignUp eventId={this.state.eventId} />
        </div>
      );
    }
  }
}
