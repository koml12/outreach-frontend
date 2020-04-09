import React, { Component } from "react";

import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RegisteredEvents from "./RegisteredEvents";
import ResumeInfo from "../ResumeInfo";

class CandidateDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resume: null,
    };
    this.getResume = this.getResume.bind(this);
  }

  componentDidMount() {
    const { registrations } = this.props;
    const resumeId = registrations && registrations.length > 0 ? registrations[0].resume : null;
    console.log("Resume id: ", resumeId);
    this.getResume(resumeId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.registrations !== prevProps.registrations && prevState.resume === null) {
      const { registrations } = this.props;
      const resumeId = registrations && registrations.length > 0 ? registrations[0].resume : null;
      this.getResume(resumeId);
    }
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

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={10}>
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

        <Grid item xs={12}>
          <RegisteredEvents registrations={this.props.registrations} />
        </Grid>
      </Grid>
    );
  }
}

// const CandidateDetail = (props) => {
//   const { registrations } = props;

//   const resumeId = registrations && registrations.length > 0 ? registrations[0].resume : null;

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={10}>
//         <Typography variant="body1" color={resumeId !== null ? "textPrimary" : "error"}>
//           {resumeId !== null ? "Candidate uploaded resume" : "Resume not uploaded yet"}
//         </Typography>
//       </Grid>

//       <Grid item xs={2}>
//         <Button variant="outlined" color="primary">
//           Text Candidate
//         </Button>
//       </Grid>

//       <Grid item xs={12}>
//         <RegisteredEvents registrations={registrations} />
//       </Grid>
//     </Grid>
//   );
// };

export default CandidateDetail;
