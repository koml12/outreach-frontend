import React from "react";
import { Redirect } from "react-router-dom";
import { userIsLoggedIn, getUserType } from "../../../utils/utils";
import EvaluatorDashboard from "../EvaluatorDashboard";

const CompanyDashboard = () => {
  if (!userIsLoggedIn("Evaluator") && !userIsLoggedIn("HR")) {
    return <Redirect to="/login" />;
  } else {
    return getUserType() === "Evaluator" ? (
      <Redirect to="/evaluator" />
    ) : (
      <h1>This is the HR dashboard (not implemented yet!)</h1>
    );
  }
};

export default CompanyDashboard;
