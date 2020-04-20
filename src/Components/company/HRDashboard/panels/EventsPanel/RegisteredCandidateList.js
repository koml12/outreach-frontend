import React, { useState } from "react";

import CandidateList from "../CandidateList";
import RegisteredCandidateDetail from "./RegisteredCandidateDetail";

const RegisteredCandidateList = (props) => {
  const { registrations, onRegistrationChange, event } = props;

  const [expandedCandidate, setExpandedCandidate] = useState(null);

  const candidates = registrations.map((registration) => registration.candidate);

  const onCandidateExpandedChange = (candidate) => {
    if (expandedCandidate === candidate) {
      setExpandedCandidate(null);
    } else {
      setExpandedCandidate(candidate);
    }
  };

  return (
    <CandidateList
      candidates={candidates}
      expandedCandidate={expandedCandidate}
      detailComponent={RegisteredCandidateDetail}
      details={registrations.map((registration) => {
        return { ...registration, event };
      })}
      detailDataName="registration"
      onDetailDataChange={onRegistrationChange}
      onExpandedChange={onCandidateExpandedChange}
    />
  );
};

export default RegisteredCandidateList;
