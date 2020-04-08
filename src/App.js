import React from "react";
import "./App.css";
import { Header, Footer } from "./components/common";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import EventRegistration from "./components/EventRegistration";
import EventDashboard from "./components/EventDashboard";
import EventQuestionnaire from "./components/Questionnaire/EventQuestionnaire";
import EventSurvey from "./components/Questionnaire/EventSurvey";
import CompanyLogin from "./components/company/CompanyLogin";
import CompanyDashboard from "./components/company/CompanyDashboard";
import EvaluatorDashboard from "./components/company/EvaluatorDashboard";
import EvaluatorSurvey from "./components/company/EvaluatorSurvey";

import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import * as Survey from "survey-react";
import "survey-react/survey.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Header company="Company Name" loggedIn={!this.props.location.pathname.endsWith("login")} />
          <Toolbar />
          <Switch>
            <Route exact path="/" component={CompanyDashboard} />
            <Route exact path="/evaluator" component={EvaluatorDashboard} />
            <Route exact path="/evaluator/events/:eventId" component={EvaluatorSurvey} />
            <Route exact path="/login" component={CompanyLogin} />
            <Route exact path="/events/:eventId/login" component={EventRegistration} />
            <Route exact path="/events/:eventId/" component={EventDashboard} />
            <Route exact path="/events/:eventId/questionnaire" component={EventQuestionnaire} />
            <Route exact path="/events/:eventId/survey" component={EventSurvey} />
          </Switch>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
