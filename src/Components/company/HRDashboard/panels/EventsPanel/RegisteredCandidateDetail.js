import React, { Component } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { getToken } from "../../../../../utils/utils";

import CandidateQuestionResponses from "./CandidateQuestionResponses";
import EvaluatorQuestionResponses from "./EvaluatorQuestionResponses";
import ResumeInfo from "../ResumeInfo";

class RegisteredCandidateDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      registration: {
        id: props.id,
        group: props.group,
        resume: props.resume,
        event: props.event,
        candidate: props.candidate,
      },
      resume: null,
    };
    this.getAvailableGroups = this.getAvailableGroups.bind(this);
    this.getResume = this.getResume.bind(this);
    this.onGroupSelect = this.onGroupSelect.bind(this);
  }

  componentDidMount() {
    this.getAvailableGroups();
    this.getResume(this.props.resume);
  }

  getAvailableGroups() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/group/",
    }).then((response) => {
      const groups = response.data;
      this.setState({ groups });
    });
  }

  getResume(resumeId) {
    if (!resumeId) {
      return;
    }
    axios({
      method: "get",
      url: `http://localhost:8000/api/resume/${resumeId}/`,
    }).then((response) => {
      const resume = response.data;
      this.setState({ resume });
    });
  }

  onGroupSelect(event) {
    axios({
      method: "patch",
      url: `http://localhost:8000/api/registration/${this.props.id}/`,
      data: { group: event.target.value },
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then(() => {
      let registration = {
        ...this.state.registration,
        group: event.target.value,
      };
      this.setState({ registration });
    });
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl style={{ minWidth: "240px" }}>
            <InputLabel>Group</InputLabel>
            <Select defaultValue={this.state.registration.group} onChange={this.onGroupSelect}>
              {this.state.groups.map((group) => (
                <MenuItem value={group.id}>{`Group ${group.id}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          {this.state.resume === null ? (
            <Typography variant="body1" color="error">
              No resume uploaded yet
            </Typography>
          ) : (
            <ResumeInfo url={this.state.resume.file} />
          )}
        </Grid>

        <Grid item xs={2}>
          <Button variant="outlined" color="primary">
            Text Candidate
          </Button>
        </Grid>

        <Grid item xs={12} />

        <Grid item xs={5}>
          <CandidateQuestionResponses />
        </Grid>
        <Grid item xs={1} />

        <Grid item xs={5}>
          <EvaluatorQuestionResponses />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    );
  }
}

export default RegisteredCandidateDetail;
