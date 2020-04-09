import React, { Component } from "react";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import LaunchIcon from "@material-ui/icons/Launch";
import Grid from "@material-ui/core/Grid";

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
    if (groupId === null) {
      return;
    }
    axios({
      method: "get",
      url: `http://localhost:8000/api/group/${groupId}/`,
    }).then((response) => {
      const group = response.data;
      const { evaluator } = group;
      this.setState({ group });
      this.getEvaluatorInfo(evaluator);
    });
  }

  getEvaluatorInfo(evaluatorId) {
    if (evaluatorId === null) {
      return;
    }
    axios({
      method: "get",
      url: `http://localhost:8000/api/evaluators/${evaluatorId}/`,
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then((response) => {
      const evaluator = response.data;
      this.setState({ evaluator });
    });
  }

  render() {
    const { event, group, evaluator } = this.state;

    return (
      <div>
        <ListItem>
          <ListItemText>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h6">{event !== null && event["Event Name"]}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1">{group !== null ? `Group ${group.id}` : "No group assigned"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  {evaluator !== null
                    ? `Evaluated by: ${evaluator["first_name"]} ${evaluator["last_name"]}`
                    : "No evaluator assigned"}
                </Typography>
              </Grid>
            </Grid>
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <LaunchIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItemText>
        </ListItem>
        <Divider />
      </div>
    );
  }
}

export default CandidateEventInfo;
