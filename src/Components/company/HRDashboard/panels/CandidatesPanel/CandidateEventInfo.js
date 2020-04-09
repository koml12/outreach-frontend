import React, { Component } from "react";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

import { getToken } from "../../../../../utils/utils";

class CandidateEventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      group: null,
      evaluator: null,
    };
    this.getEventInfo = this.getEventInfo.bind(this);
    this.getGroupInfo = this.getGroupInfo.bind(this);
    this.getEvaluatorInfo = this.getEvaluatorInfo.bind(this);
  }

  componentDidMount() {
    this.getEventInfo(this.props.event);
    this.getGroupInfo(this.props.group);
  }

  getEventInfo(eventId) {
    axios({
      method: "get",
      url: `http://localhost:8000/api/event/${eventId}/`,
    }).then((response) => {
      const event = response.data;
      this.setState({ event });
    });
  }

  getGroupInfo(groupId) {
    axios({
      method: "get",
      url: `http://localhost:8000/api/group/${groupId}/`,
    }).then((response) => {
      const group = response.data;
      const { evaluator } = group;
      this.setState(group);
      this.getEvaluatorInfo(evaluator);
    });
  }

  getEvaluatorInfo(evaluatorId) {
    axios({
      method: "get",
      url: `http://localhost:8000/api/evaluators/${evaluatorId}/`,
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    });
  }

  render() {
    return (
      <div>
        <ListItem>
          {this.state.event !== null && <Typography variant="body1">{this.state.event["Event Name"]}</Typography>}
          {this.state.group !== null && <Typography variant="body1">Group {this.state.group.id}</Typography>}
          {this.state.evaluator !== null && (
            <Typography variant="body1">
              {this.state.evaluator["first_name"]} {this.state.evaluator["last_name"]}
            </Typography>
          )}
        </ListItem>
      </div>
    );
  }
}

export default CandidateEventInfo;
