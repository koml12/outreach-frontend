import React, { Component } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";

import { EventInfo } from "../../../../common/";
import RegisteredCandidateList from "./RegisteredCandidateList";

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

  handleRegistrationChange(registration) {}

  render() {
    return (
      <div>
        <IconButton onClick={this.props.onBackClicked}>
          <ArrowBackTwoToneIcon fontSize="large" />
        </IconButton>
        <EventInfo event={this.state.event} />
        <RegisteredCandidateList
          registrations={this.state.registrations}
          onRegistrationChange={this.handleRegistrationChange}
        />
      </div>
    );
  }
}
