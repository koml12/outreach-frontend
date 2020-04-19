import React, { Component } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";

import { EventInfo } from "../../../../common/";
import RegisteredCandidateList from "./RegisteredCandidateList";
import JobChips from "./JobChips";
import QuestionnaireSelects from "./QuestionnaireSelects";
import { getToken } from "../../../../../utils/utils";

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
        questionnaire: props.event["questionnaire"],
        survey: props.event["survey"],
      },
      eventId: props.event.id,
      registrations: [],
      expandedRegistration: null,
      jobs: [],
      questionnaires: [],
      surveys: [],
      selectedJob: null,
    };
    this.handleExpansionChange = this.handleExpansionChange.bind(this);
    this.getAllJobs = this.getAllJobs.bind(this);
    this.getAllRegistrations = this.getAllRegistrations.bind(this);
    this.getCandidatesRankedByJob = this.getCandidatesRankedByJob.bind(this);
    this.getAllQuestionnaires = this.getAllQuestionnaires.bind(this);
    this.getAllSurveys = this.getAllSurveys.bind(this);
    this.handleJobClicked = this.handleJobClicked.bind(this);
    this.handleQuestionnaireChanged = this.handleQuestionnaireChanged.bind(this);
    this.handleSurveyChanged = this.handleSurveyChanged.bind(this);
  }

  componentDidMount() {
    this.getAllRegistrations();
    this.getAllJobs();
    this.getAllQuestionnaires();
    this.getAllSurveys();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedJob !== this.state.selectedJob) {
      if (this.state.selectedJob) {
        this.getCandidatesRankedByJob(this.state.selectedJob.id);
      } else {
        this.getAllRegistrations();
      }
    }
  }

  getAllRegistrations() {
    axios({
      method: "get",
      url: `http://localhost:8000/api/registration/`,
    }).then((response) => {
      console.log(response.data);
      let registrations = response.data.filter((registration) => registration.event === this.props.event.id);
      this.setState({ registrations });
    });
  }

  getAllJobs() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/job/",
    }).then((response) => {
      const jobs = response.data;
      this.setState({ jobs });
    });
  }

  getCandidatesRankedByJob(jobId) {
    axios({
      method: "post",
      url: "http://localhost:8000/api/ranking/",
      data: {
        event: this.props.event.id,
        job: jobId,
      },
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then((response) => {
      const registrations = response.data;
      this.setState({ registrations });
    });
  }

  getAllQuestionnaires() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/questionnaire/",
    }).then((response) => {
      const questionnaires = response.data.map((questionnaire) => {
        return { ...questionnaire, type: "questionnaire" };
      });
      this.setState({ questionnaires });
    });
  }

  getAllSurveys() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/survey/",
    }).then((response) => {
      const surveys = response.data.map((survey) => {
        return { ...survey, type: "survey" };
      });
      this.setState({ surveys });
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

  handleJobClicked(jobId) {
    if (jobId === null) {
      this.setState({ selectedJob: null });
      return;
    }
    const job = this.state.jobs.find((j) => j.id === jobId);
    if (job === this.state.selectedJob) {
      this.setState({ selectedJob: null });
    } else {
      this.setState({ selectedJob: job });
    }
  }

  handleQuestionnaireChanged(questionnaireId) {
    axios({
      method: "patch",
      url: `http://localhost:8000/api/event/${this.props.event.id}/`,
      data: {
        questionnaire: questionnaireId,
      },
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then(() => {
      const event = { ...this.state.event, questionnaire: questionnaireId };
      this.setState({ event });
    });
  }

  handleSurveyChanged(surveyId) {
    axios({
      method: "patch",
      url: `http://localhost:8000/api/event/${this.props.event.id}/`,
      data: {
        survey: surveyId,
      },
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then(() => {
      const event = { ...this.state.event, survey: surveyId };
      this.setState({ event });
    });
  }

  render() {
    return (
      <div style={{ padding: "10px" }}>
        <IconButton onClick={this.props.onBackClicked}>
          <ArrowBackTwoToneIcon fontSize="large" />
        </IconButton>
        <EventInfo event={this.state.event} />
        <QuestionnaireSelects
          questionnaires={this.state.questionnaires}
          surveys={this.state.surveys}
          selectedQuestionnaire={this.state.event.questionnaire}
          selectedSurvey={this.state.event.survey}
          onQuestionnaireChange={this.handleQuestionnaireChanged}
          onSurveyChange={this.handleSurveyChanged}
        />
        <JobChips
          jobs={this.state.jobs}
          selectedJob={this.state.selectedJob}
          onJobClicked={this.handleJobClicked}
          style={{ margin: "5px" }}
        />
        <RegisteredCandidateList
          registrations={this.state.registrations}
          onRegistrationChange={this.handleRegistrationChange}
          event={this.state.event}
        />
      </div>
    );
  }
}
