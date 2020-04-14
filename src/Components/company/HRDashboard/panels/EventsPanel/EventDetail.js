import React, { Component } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";

import { EventInfo } from "../../../../common/";
import RegisteredCandidateList from "./RegisteredCandidateList";
import JobChips from "./JobChips";

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
      jobs: [],
      selectedJob: null,
    };
    this.handleExpansionChange = this.handleExpansionChange.bind(this);
    this.getAllJobs = this.getAllJobs.bind(this);
    this.getCandidatesRankedByJob = this.getCandidatesRankedByJob.bind(this);
    this.handleJobClicked = this.handleJobClicked.bind(this);
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
    this.getAllJobs();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedJob !== this.props.selectedJob) {
      this.getAllJobs(this.props.selectedJob);
    }
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
    // axios({
    //   method: "get",
    //   url: `http://localhost:8000/api/registration/?event=${this.props.event.id}${jobId ? `&job=${jobId}` : ""}`,
    // }).then((response) => {
    //   const registrations = response.data;
    //   this.setState({ registrations });
    // });
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

  render() {
    return (
      <div style={{ padding: "10px" }}>
        <IconButton onClick={this.props.onBackClicked}>
          <ArrowBackTwoToneIcon fontSize="large" />
        </IconButton>
        <EventInfo event={this.state.event} />
        <JobChips
          jobs={this.state.jobs}
          selectedJob={this.state.selectedJob}
          onJobClicked={this.handleJobClicked}
          style={{ margin: "5px" }}
        />
        <RegisteredCandidateList
          registrations={this.state.registrations}
          onRegistrationChange={this.handleRegistrationChange}
        />
      </div>
    );
  }
}
