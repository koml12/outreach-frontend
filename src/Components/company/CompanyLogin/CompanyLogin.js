import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { Login, ErrorMessage } from "../../common";
import { userIsLoggedIn } from "../../../utils/utils";

class CompanyLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInfo: {},
      showErrorMessage: false,
      isLoggedIn: userIsLoggedIn("Evaluator")
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginClicked = this.handleLoginClicked.bind(this);
  }

  handleInputChange(event) {
    let loginInfo = this.state.loginInfo;
    loginInfo[event.target.name] = event.target.value;
    this.setState({ loginInfo });
  }

  handleLoginClicked() {
    axios({
      url: "http://localhost:8000/api/login/",
      method: "post",
      data: this.state.loginInfo
    })
      .then(response => {
        console.log(response.data);
        if (
          response.status === 200 &&
          (response.data["user_type"] === "Evaluator" || response.data["user_type"] === "HR")
        ) {
          this.saveAuthToken(response.data.token, response.data["user_type"], response.data.id);
          this.setState({ isLoggedIn: true });
        } else {
          this.setState({ showErrorMessage: true });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ showErrorMessage: true });
      });
  }

  saveAuthToken(token, userType, id) {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("type", userType);
    sessionStorage.setItem("userId", id);
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {this.state.isLoggedIn && <Redirect to="/" />}
        <Login onInputChange={this.handleInputChange} onLogIn={this.handleLoginClicked} />
        {this.state.showErrorMessage && <ErrorMessage offset={3} message="Invalid email/password. Please try again." />}
      </div>
    );
  }
}

export default CompanyLogin;
