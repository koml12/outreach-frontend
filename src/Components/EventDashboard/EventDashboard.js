import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { userIsLoggedIn } from "../../utils/utils.js";

export default class EventDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.match.params.eventId
    };
  }

  render() {
    if (!userIsLoggedIn()) {
      return <Redirect to={`/events/${this.state.eventId}/login`} />;
    } else {
      return (
        <div>
          <h1>This is the event dashboard</h1>
        </div>
      );
    }
  }
}
