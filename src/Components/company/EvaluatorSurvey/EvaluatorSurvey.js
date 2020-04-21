import React, { Component } from "react";
import axios from "axios";
import { getUserId } from "../../../utils/utils";
import GroupSurveyList from "./GroupSurveyList";
import { EventInfo } from "../../common";

class EvaluatorSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      event: null,
    };
    this.getCandidateForId = this.getCandidateForId.bind(this);
  }

  getCandidateForId(id, registrations) {
    return registrations.find((registration) => registration.id === id);
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/registration/",
    }).then((response) => {
      console.log(response.data);
      this.getGroupsWithCandidateInfo(response.data);
    });

    axios({
      method: "get",
      url: `http://localhost:8000/api/event/${this.props.match.params.eventId}`,
    }).then((response) => {
      let event = {};
      event.name = response.data["Event Name"];
      event.description = response.data["Description"];
      event.startDatetime = new Date(response.data["Start Time"]);
      event.endDatetime = new Date(response.data["End Time"]);
      this.setState({ event });
    });
  }

  getGroupsWithCandidateInfo(candidates) {
    axios({
      method: "get",
      url: `http://localhost:8000/api/group/?evaluator=${getUserId()}&event=${this.props.match.params.eventId}`,
    }).then((response) => {
      let groups = response.data;
      for (let group of groups) {
        console.log(group);
        let candidatesInfo = group.candidates
          .map((candidateId) => this.getCandidateForId(candidateId, candidates))
          .filter((candidateInfo) => candidateInfo !== undefined)
          .map((candidateInfo) => candidateInfo.candidate);
        group.candidates = candidatesInfo;
      }
      this.setState({ groups });
    });
  }

  render() {
    return (
      <div>
        {this.state.event !== null && <EventInfo event={this.state.event} />}
        {this.state.groups === null ? (
          <p>Loading group info...</p>
        ) : (
          this.state.groups.map((group) => (
            <GroupSurveyList name={group.name} eventId={group.event.id} candidates={group.candidates} />
          ))
        )}
      </div>
    );
  }
}

export default EvaluatorSurvey;
