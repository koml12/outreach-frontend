import React, { Component } from "react";
import Register from "./Register";
import Login from "./Login";
import RegistrationSwitch from "./RegistrationSwitch";
import ErrorMessage from "./ErrorMessage";
import EventInfo from "./EventInfo";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { userIsLoggedIn } from "../../utils/utils";

class EventRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        name: "",
        description: "",
        startDatetime: new Date(),
        endDatetime: new Date()
      },
      registrationInfo: {},
      loginInfo: {},
      showRegistration: true,
      showErrorMessage: false,
      isLoggedIn: userIsLoggedIn()
    };
    this.handleRegisteredInputChange = this.handleRegisteredInputChange.bind(this);
    this.handleRegisterClicked = this.handleRegisterClicked.bind(this);
    this.handleLogInInputChange = this.handleLogInInputChange.bind(this);
    this.handleLogInClicked = this.handleLogInClicked.bind(this);
    this.handleRegistrationSwitch = this.handleRegistrationSwitch.bind(this);
    this.generateErrorMessage = this.generateErrorMessage.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/events/" + this.props.match.params.eventId)
      .then(response => this.setState({ event: response.data }));
  }

  handleRegisteredInputChange(event) {
    let registrationInfo = this.state.registrationInfo;
    registrationInfo[event.target.name] = event.target.value;
    this.setState({ registrationInfo });
  }

  handleRegisterClicked() {
    axios({
      url: `http://localhost:8000/api/register/${this.props.match.params.eventId}/`,
      method: "post",
      data: this.createCandidateInfo(this.state.registrationInfo)
    }).then(response => {
      this.saveAuthToken(response.data.token);
      this.setState({ isLoggedIn: true });
    });
  }

  createCandidateInfo(registrationInfo) {
    let candidateInfo = {};
    candidateInfo["first_name"] = registrationInfo["first_name"];
    candidateInfo["last_name"] = registrationInfo["last_name"];
    candidateInfo["email"] = registrationInfo["email"];
    candidateInfo["Phone Number"] = registrationInfo["Phone Number"];
    candidateInfo["password"] = registrationInfo["password"];
    return candidateInfo;
  }

  handleLogInInputChange(event) {
    let loginInfo = this.state.loginInfo;
    loginInfo[event.target.name] = event.target.value;
    this.setState({ loginInfo });
  }

  handleLogInClicked() {
    axios({
      url: "http://localhost:8000/api/login",
      method: "post",
      data: this.state.loginInfo
    })
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.saveAuthToken(response.data.token);
          this.setState({ isLoggedIn: true });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ showErrorMessage: true });
      });
  }

  handleRegistrationSwitch() {
    this.setState(prevState => ({
      showRegistration: !prevState.showRegistration
    }));
  }

  saveAuthToken(token) {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("type", "candidate");
  }

  generateErrorMessage() {
    return this.state.showRegistration ? "All fields are required to register." : "Invalid login. Please try again.";
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to={`/events/${this.props.match.params.eventId}/`} />;
    }
    return (
      <div>
        <EventInfo event={this.state.event} />
        {this.state.showRegistration ? (
          <Register onInputChange={this.handleRegisteredInputChange} onRegister={this.handleRegisterClicked} />
        ) : (
          <Login onInputChange={this.handleLogInInputChange} onLogIn={this.handleLogInClicked} />
        )}
        {this.state.showErrorMessage ? <ErrorMessage message={this.generateErrorMessage()} /> : null}
        <RegistrationSwitch
          isRegistering={this.state.showRegistration}
          onRegisterSwitch={this.handleRegistrationSwitch}
        />
      </div>
    );
  }
}

export default EventRegistration;
