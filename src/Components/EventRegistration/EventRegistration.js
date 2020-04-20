import React, { Component } from "react";
import { Register, Login } from "../common";
import RegistrationSwitch from "./RegistrationSwitch";
import { ErrorMessage } from "../common";
import EventInfo from "../common/EventInfo";
import EventNotFound from "./EventNotFound";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { userIsLoggedIn } from "../../utils/utils";
import dayjs from "dayjs";

class EventRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        name: "Loading Event Info...",
        description: "",
        startDatetime: null,
        endDatetime: null,
      },
      registrationInfo: {
        password: dayjs().format("YYYY-MM-DD"),
      },
      loginInfo: {
        password: dayjs().format("YYYY-MM-DD"),
      },
      showRegistration: true,
      showErrorMessage: false,
      isLoggedIn: userIsLoggedIn("Candidate"),
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
      .get("http://localhost:8000/api/event/" + this.props.match.params.eventId)
      .then((response) => {
        let { event } = { ...this.state };
        event.name = response.data["Event Name"];
        event.description = response.data["Description"];
        event.startDatetime = new Date(response.data["Start Time"]);
        event.endDatetime = new Date(response.data["End Time"]);
        this.setState({ event });
      })
      .catch(() => this.setState({ event: null }));
  }

  handleRegisteredInputChange(event) {
    let registrationInfo = this.state.registrationInfo;
    registrationInfo[event.target.name] = event.target.value;
    this.setState({ registrationInfo });
  }

  handleRegisterClicked() {
    axios({
      url: `http://localhost:8000/api/registration/`,
      method: "post",
      data: this.createRegistrationInfo(this.state.registrationInfo, this.props.match.params.eventId),
    }).then((response) => {
      axios({
        url: "http://localhost:8000/api/login/",
        method: "post",
        data: {
          username: this.state.registrationInfo.email,
          password: this.state.registrationInfo.password,
        },
      })
        .then((response2) => {
          console.log(response2.data);
          if (response2.status === 200 && response2.data["user_type"] === "Candidate") {
            this.saveAuthToken(response2.data.token, "Candidate", response2.data.id);
            this.setState({ isLoggedIn: true });
          } else {
            this.setState({ showErrorMessage: true });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ showErrorMessage: true });
        });
    });
  }

  createRegistrationInfo(registrationInfo, eventId) {
    let registrationData = {};
    let candidateInfo = {};
    candidateInfo["first_name"] = registrationInfo["first_name"];
    candidateInfo["last_name"] = registrationInfo["last_name"];
    candidateInfo["email"] = registrationInfo["email"];
    candidateInfo["phone_number"] = registrationInfo["Phone Number"];
    candidateInfo["password"] = registrationInfo["password"];
    registrationData["candidate"] = candidateInfo;
    registrationData["event"] = eventId;
    return registrationData;
  }

  handleLogInInputChange(event) {
    let loginInfo = this.state.loginInfo;
    loginInfo[event.target.name] = event.target.value;
    this.setState({ loginInfo });
  }

  handleLogInClicked() {
    axios({
      url: "http://localhost:8000/api/login/",
      method: "post",
      data: this.state.loginInfo,
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200 && response.data["user_type"] === "Candidate") {
          this.saveAuthToken(response.data.token, "Candidate", response.data.id);
          this.setState({ isLoggedIn: true });
        } else {
          this.setState({ showErrorMessage: true });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ showErrorMessage: true });
      });
  }

  handleRegistrationSwitch() {
    this.setState((prevState) => ({
      showRegistration: !prevState.showRegistration,
    }));
  }

  saveAuthToken(token, userType, id) {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("type", userType);
    sessionStorage.setItem("userId", id);
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
        {this.state.event === null ? (
          <EventNotFound />
        ) : (
          <div>
            <EventInfo event={this.state.event} />
            {this.state.showRegistration ? (
              <Register onInputChange={this.handleRegisteredInputChange} onRegister={this.handleRegisterClicked} />
            ) : (
              <Login
                variant="Candidate"
                onInputChange={this.handleLogInInputChange}
                onLogIn={this.handleLogInClicked}
              />
            )}
            {this.state.showErrorMessage ? <ErrorMessage offset={3} message={this.generateErrorMessage()} /> : null}
            <RegistrationSwitch
              isRegistering={this.state.showRegistration}
              onRegisterSwitch={this.handleRegistrationSwitch}
            />
          </div>
        )}
      </div>
    );
  }
}

export default EventRegistration;
