import React from "react";
import "./App.css";
import { Header, Footer } from "./components/common";
import { Switch, Route } from "react-router-dom";
import EventRegistration from "./components/EventRegistration";
import EventDashboard from "./components/EventDashboard";
import QuestionReader from "./components/Questionnaire/QuestionReader";

import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import * as Survey from "survey-react";
import "survey-react/survey.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header company="Company Name" />
        <Toolbar />
        <Container>
          <Switch>
            <Route exact path="/events/:eventId/login" component={EventRegistration} />
            <Route exact path="/events/:eventId/" component={EventDashboard} />
            <Route exact path="/events/:eventId/" component={QuestionReader}/>
          </Switch>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
