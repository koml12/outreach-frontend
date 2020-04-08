import React from "react";
import { Redirect } from "react-router-dom";
import { userIsLoggedIn, getUserType } from "../../../utils/utils";
import EvaluatorDashboard from "../EvaluatorDashboard";
import HRDashboard from "../HRDashboard";

const CompanyDashboard = () => {
  if (!userIsLoggedIn("Evaluator") && !userIsLoggedIn("HR")) {
    return <Redirect to="/login" />;
  } else {
    return getUserType() === "Evaluator" ? <Redirect to="/evaluator" /> : <HRDashboard />;
  }
};

export default CompanyDashboard;
