import React, { Component } from "react";
import axios from "axios";

import JobsList from "./JobsList";
import AddButton from "../AddButton";
import AddJobModal from "./AddJobModal";
import DeleteJobModal from "./DeleteJobModal";
import { getToken } from "../../../../../utils/utils";

export default class JobsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      modifyingJob: null,
      showAddEditModal: false,
      showDeleteModal: false,
    };
    this.getAllJobs = this.getAllJobs.bind(this);
    this.handleAddJobClicked = this.handleAddJobClicked.bind(this);
    this.handleEditJobClicked = this.handleEditJobClicked.bind(this);
    this.handleDeleteJobClicked = this.handleDeleteJobClicked.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.submitJob = this.submitJob.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
  }

  componentDidMount() {
    this.getAllJobs();
  }

  getAllJobs() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/job/",
    }).then((response) => {
      const jobs = response.data;
      console.log(jobs);
      this.setState({ jobs });
    });
  }

  handleAddJobClicked() {
    this.setState({ showAddEditModal: true });
  }

  handleEditJobClicked(job) {
    this.setState({ showAddEditModal: true, modifyingJob: job });
  }

  handleDeleteJobClicked(job) {
    this.setState({ showDeleteModal: true, modifyingJob: job });
  }

  handleModalClose() {
    this.setState({ showAddEditModal: false, showDeleteModal: false, modifyingJob: null });
  }

  submitJob(job) {
    axios({
      method: job.id ? "patch" : "post",
      url: `http://localhost:8000/api/job/${job.id ? job.id + "/" : ""}`,
      data: job,
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then((response) => {
      let jobs = [];
      if (job.id) {
        const foundIndex = this.state.jobs.findIndex((j) => j.id === job.id);
        jobs = [...this.state.jobs.slice(0, foundIndex), response.data, ...this.state.jobs.slice(foundIndex + 1)];
      } else {
        jobs = [...this.state.jobs, response.data];
      }
      this.setState({ jobs });
      this.handleModalClose();
    });
  }

  deleteJob(job) {
    axios({
      method: "delete",
      url: `http://localhost:8000/api/job/${job.id}/`,
    }).then(() => {
      const foundIndex = this.state.jobs.findIndex((j) => j.id === job.id);
      const jobs = [...this.state.jobs.slice(0, foundIndex), ...this.state.jobs.slice(foundIndex + 1)];
      this.setState({ jobs });
      this.handleModalClose();
    });
  }

  render() {
    return (
      <div>
        {this.state.showAddEditModal && (
          <AddJobModal
            job={this.state.modifyingJob}
            open={this.state.showAddEditModal}
            onClose={this.handleModalClose}
            onSubmit={this.submitJob}
          />
        )}

        {this.state.showDeleteModal && this.state.modifyingJob !== null && (
          <DeleteJobModal
            title={this.state.modifyingJob["Job Title"]}
            open={this.state.showDeleteModal}
            onClose={this.handleModalClose}
            onDelete={() => this.deleteJob(this.state.modifyingJob)}
          />
        )}

        <JobsList
          jobs={this.state.jobs}
          onEditJob={this.handleEditJobClicked}
          onDeleteJob={this.handleDeleteJobClicked}
        />
        <AddButton onClick={this.handleAddJobClicked} />
      </div>
    );
  }
}
