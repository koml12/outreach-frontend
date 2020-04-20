import React, { Component } from "react";
import { getSurveys, getFromApi } from "../Questionnaire/QuestionReader";
import "survey-react/survey.css";
import * as Survey from "survey-react";
import Axios from "axios";

class EventSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.eventId,
      candidateId: props.candidateId,
      evaluatorId: sessionStorage.getItem("userId"),
    };
  }

  onCompleteComponent = (survey) => {
    this.setState({
      isCompleted: true,
    });

    this.sendToServer(survey.data);
  };

  postAnswerToDb = (answerJson) => {
    const url = "http://localhost:8000/api/answer/";
    Axios.post(url, answerJson).then(
      (response) => {
        console.log("answer has been saved");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  parseToAnswerId = (keyArray, data) => {
    var answerId = [];
    for (var i = 0; i < keyArray.length; i++) {
      var questionObj = getFromApi("question", keyArray[i]);
      for (var j = 0; j < 5; j++) {
        if (j === 0) {
          if (data[keyArray[i]] === questionObj.op1) {
            answerId.push(j);
            break;
          }
        } else if (j === 1) {
          if (data[keyArray[i]] === questionObj.op2) {
            answerId.push(j);
            break;
          }
        } else if (j === 2) {
          if (data[keyArray[i]] === questionObj.op3) {
            answerId.push(j);
            break;
          }
        } else if (j === 3) {
          if (data[keyArray[i]] === questionObj.op4) {
            answerId.push(j);
            break;
          }
        } else if (j === 4) {
          if (data[keyArray[i]] === questionObj.op5) {
            answerId.push(j);
            break;
          }
        }
      }
    }
    return answerId;
  };

  sendToServer = (data) => {
    var keyArray = Object.keys(data);
    //var questionObj = getFromApi("question", jsonObject.questions[i]);
    var answerId = this.parseToAnswerId(keyArray, data);
    for (var i = 0; i < answerId.length; i++) {
      var json = {
        candidate: this.state.candidateId,
        evaluator: this.state.evaluatorId,
        question: parseInt(keyArray[i]),
        answer: parseInt(answerId[i]),
      };
      this.postAnswerToDb(json);
    }
  };

  render() {
    Survey.StylesManager.applyTheme("darkblue");

    var json = {
      questions: getSurveys(this.state.eventId),
    };
    console.log(json);

    var surveyRender = !this.state.isCompleted ? (
      <Survey.Survey json={json} showCompletedPage={false} onComplete={this.onCompleteComponent} />
    ) : null;
    var onSurveyCompletion = this.state.isCompleted ? <div> Thanks for completing the survey</div> : null;

    return (
      <div className="App">
        <div>
          {surveyRender}
          {onSurveyCompletion}
        </div>
      </div>
    );
  }
}
export default EventSurvey;
