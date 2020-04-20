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
import TextSentConfirmation from "../TextSentConfirmation";

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
      evaluator: null,
      resume: null,
      questionnaireAnswers: [],
      surveyAnswers: [],
      showSnackbar: false,
    };
    this.getAvailableGroups = this.getAvailableGroups.bind(this);
    this.getResume = this.getResume.bind(this);
    this.getSavedAnswers = this.getSavedAnswers.bind(this);
    this.onGroupSelect = this.onGroupSelect.bind(this);
    this.sendTextToCandidate = this.sendTextToCandidate.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
  }

  componentDidMount() {
    this.getAvailableGroups();
    this.getResume(this.props.resume);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getAvailableGroups();
    }
  }

  getAvailableGroups() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/group/",
    }).then((response) => {
      const groups = response.data;
      this.setState({ groups });
      if (this.props.group) {
        const evaluator = groups.find((g) => g.id === this.props.group).evaluator;
        this.getSavedAnswers(evaluator);
      }
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

  getSavedAnswers(evaluatorId) {
    axios({
      method: "get",
      url: "http://localhost:8000/api/answer/",
    }).then((response) => {
      const questionnaireId = this.props.event.questionnaire;
      const surveyId = this.props.event.survey;
      const candidateId = this.props.candidate.id;
      if (questionnaireId) {
        const questionnaireAnswers = response.data.filter((ans) => {
          return (
            ans.question.questionnaire === questionnaireId && ans.candidate === candidateId && ans.evaluator === null
          );
        });

        console.log(questionnaireId, candidateId, evaluatorId, questionnaireAnswers);

        this.setState({ questionnaireAnswers });
      }

      if (surveyId) {
        const surveyAnswers = response.data.filter((ans) => {
          return (
            ans.question.questionnaire === surveyId && ans.candidate === candidateId && ans.evaluator === evaluatorId
          );
        });
        this.setState({ surveyAnswers });
      }
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
      let evaluator = this.state.groups.find((g) => g.id === event.target.value).evaluator;
      this.setState({ registration, evaluator });
    });
  }

  sendTextToCandidate() {
    axios({
      method: "get",
      url: `http://localhost:8000/api/smsnotify/${this.props.candidate.id}`,
    });
    this.setState({ showSnackbar: true });
  }

  handleSnackbarClose() {
    this.setState({ showSnackbar: false });
  }

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl style={{ minWidth: "240px" }}>
            <InputLabel>Group</InputLabel>
            <Select
              value={this.state.registration.group ? this.state.registration.group : ""}
              onChange={this.onGroupSelect}
            >
              {this.state.groups.map((group) => (
                <MenuItem value={group.id} key={`registration-${this.props.id}-group-${group.id}`}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          {this.state.resume === null ? (
            <Typography variant="body1" color="error">
              No resume uploaded yet
            </Typography>
          ) : (
            <ResumeInfo url={this.state.resume.file} />
          )}
        </Grid>

        <Grid item xs={2}>
          <Button variant="outlined" color="primary" onClick={this.sendTextToCandidate}>
            Text Candidate
          </Button>
        </Grid>

        <Grid item xs={12} />

        <Grid item xs={5}>
          <CandidateQuestionResponses savedAnswers={this.state.questionnaireAnswers} />
        </Grid>

        <Grid item xs={1} />

        <Grid item xs={5}>
          <EvaluatorQuestionResponses savedAnswers={this.state.surveyAnswers} />
        </Grid>
        <Grid item xs={1} />

        <TextSentConfirmation open={this.state.showSnackbar} onClose={this.handleSnackbarClose} />
      </Grid>
    );
  }
}

export default RegisteredCandidateDetail;
