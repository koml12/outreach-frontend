import React from "react";
import "./App.css";
import { Header, Footer } from "./components/common";
import { Switch, Route } from "react-router-dom";
import EventRegistration from "./components/EventRegistration";
import EventDashboard from "./components/EventDashboard";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";

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
          </Switch>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
