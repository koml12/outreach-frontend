import React, { Component } from "react";
import axios from "axios";
import ResumeDropzone from "./ResumeDropzone";
import UploadButton from "./UploadButton";
import { ErrorMessage, SuccessMessage } from "../common";
import { getToken, getUserId } from "../../utils/utils";

export default class ResumeUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: null,
      file: null,
      errorMessage: null,
      successMessage: null,
    };
    this.handleFileDropped = this.handleFileDropped.bind(this);
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
    this.createResume = this.createResume.bind(this);
    this.addResumeToRegistration = this.addResumeToRegistration.bind(this);
    this.updateRegistrationWithResume = this.updateRegistrationWithResume.bind(this);
  }

  handleFileDropped(files) {
    let file = files[0];
    this.setState({ file, filename: file.name, errorMessage: null, successMessage: null });
  }

  handleSubmitClicked() {
    this.setState({ errorMessage: null, successMessage: null }, () => {
      if (this.state.file === null) {
        this.setState({ errorMessage: "Please upload a resume." });
      } else {
        this.createResume(this.state.file);
      }
    });
  }

  createResume(resumeFile) {
    const formData = new FormData();
    formData.append("file", resumeFile);
    axios
      .post("http://localhost:8000/api/resume/", formData)
      .then((response) => {
        const { id } = response.data;
        this.addResumeToRegistration(id);
      })
      .catch(() => {
        this.setState({ errorMessage: "Error uploading resume. Please try again." });
      });
  }

  addResumeToRegistration(resumeId) {
    axios({
      method: "get",
      url: "http://localhost:8000/api/registration/",
    })
      .then((response) => {
        console.log(response.data);
        const registrations = response.data;
        const candidateId = getUserId();
        const eventId = this.props.eventId;
        const registrationId = registrations.find((registration) => {
          console.log(registration.candidate.id, registration.event);
          console.log(registration.candidate.id === parseInt(candidateId));
          console.log(registration.event === parseInt(eventId));
          return (
            registration.candidate.id === parseInt(candidateId) && parseInt(registration.event) === parseInt(eventId)
          );
        }).id;
        console.log(registrations, candidateId, eventId, registrationId);
        this.updateRegistrationWithResume(registrationId, resumeId);
      })
      .catch(() => {
        this.setState({ errorMessage: "Error uploading resume. Please try again." });
      });
  }

  updateRegistrationWithResume(registrationId, resumeId) {
    axios({
      method: "patch",
      url: `http://localhost:8000/api/registration/${registrationId}/`,
      data: {
        resume: resumeId,
      },
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    })
      .then(() => {
        this.setState({ successMessage: "Resume successfully uploaded!" });
        this.props.onComplete();
      })
      .catch(() => {
        this.setState({ errorMessage: "Error uploading resume. Please try again." });
      });
  }

  sendResumeApiRequest(resumeData) {
    axios({
      method: "post",
      url: "http://localhost:8000/resume/",
      data: resumeData,
    })
      .then(() => {
        this.setState({ successMessage: "Resume successfully uploaded!" });
        this.props.onComplete();
      })
      .catch(() => {
        this.setState({ errorMessage: "Error uploading resume. Please try again." });
      });
  }

  render() {
    return (
      <div>
        {this.state.errorMessage !== null ? <ErrorMessage message={this.state.errorMessage} /> : null}
        {this.state.successMessage !== null ? <SuccessMessage message={this.state.successMessage} /> : null}
        <ResumeDropzone filename={this.state.filename} onDrop={this.handleFileDropped} />
        <UploadButton onSubmit={this.handleSubmitClicked} />
      </div>
    );
  }
}
