import React, { Component } from "react";
import axios from "axios";

import CandidateDetail from "./CandidateDetail";
import CandidateList from "../CandidateList";

class CandidatesPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      candidateDetails: [],
      expandedCandidate: null,
    };
    this.getAllCandidates = this.getAllCandidates.bind(this);
    this.getCandidateDetails = this.getCandidateDetails.bind(this);
    this.handleCandidateExpandedChange = this.handleCandidateExpandedChange.bind(this);
  }

  componentDidMount() {
    this.getAllCandidates();
  }

  getAllCandidates() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/candidates/",
    }).then((response) => {
      const candidates = response.data;
      this.setState({ candidates });
      this.getCandidateDetails(candidates);
    });
  }

  getCandidateDetails(candidates) {
    axios({
      method: "get",
      url: "http://localhost:8000/api/registration/",
    }).then((response) => {
      const registrations = response.data;
      const candidateDetails = candidates.map((candidate) => {
        return {
          candidate: candidate,
          registrations: registrations
            .filter((registration) => registration.candidate.id === candidate.id)
            .sort((r1, r2) => r2.id - r1.id),
        };
      });

      this.setState({ candidateDetails });
    });
  }

  handleCandidateExpandedChange(candidate) {
    if (this.state.expandedCandidate === candidate) {
      this.setState({ expandedCandidate: null });
    } else {
      this.setState({ expandedCandidate: candidate });
    }
  }

  render() {
    return (
      <div>
        <CandidateList
          candidates={this.state.candidates}
          expandedCandidate={this.state.expandedCandidate}
          onExpandedChange={this.handleCandidateExpandedChange}
          details={this.state.candidateDetails}
          detailComponent={CandidateDetail}
        />
      </div>
    );
  }
}

export default CandidatesPanel;
