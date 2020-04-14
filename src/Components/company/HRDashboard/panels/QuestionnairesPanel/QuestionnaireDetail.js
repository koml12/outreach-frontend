import React, { Component } from "react";

import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";

class QuestionnaireDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionnaire: props.questionnaire,
    };
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.props.onBackClicked}>
          <ArrowBackTwoToneIcon fontSize="large" />
        </IconButton>
        <h1>{this.props.questionnaire ? this.props.questionnaire.name : ""}</h1>
      </div>
    );
  }
}

export default QuestionnaireDetail;
