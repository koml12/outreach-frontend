import React from "react";
import { Redirect } from "react-router-dom";
import { userIsLoggedIn } from "../../../utils/utils";

const CompanyDashboard = () => {
  if (!userIsLoggedIn("Evaluator")) {
    return <Redirect to="/login" />;
  } else {
    return <h1>This is the company dashboard</h1>;
  }
};

export default CompanyDashboard;
