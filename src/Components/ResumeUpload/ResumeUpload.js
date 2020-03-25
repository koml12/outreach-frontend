import React, { Component } from "react";
import axios from "axios";
import ResumeDropzone from "./ResumeDropzone";
import UploadButton from "./UploadButton";
import { ErrorMessage, SuccessMessage } from "../common";

export default class ResumeUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: null,
      file: null,
      errorMessage: null,
      successMessage: null
    };
    this.handleFileDropped = this.handleFileDropped.bind(this);
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this);
    this.createResume = this.createResume.bind(this);
    this.sendResumeApiRequest = this.sendResumeApiRequest.bind(this);
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
        this.createResume();
      }
    });
  }

  createResume() {
    const reader = new FileReader();
    reader.onloadend = () => {
      const resumeData = {
        event: this.props.eventId,
        candidate: sessionStorage.getItem("userId"),
        resume: reader.result,
        filename: this.state.filename
      };
      this.sendResumeApiRequest(resumeData);
    };
    reader.readAsBinaryString(this.state.file);
  }

  sendResumeApiRequest(resumeData) {
    axios({
      method: "post",
      url: "http://localhost:8000/resume/",
      data: resumeData
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
