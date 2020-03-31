import React, { Component } from "react";
import Question from "../Questionnaire/Question";
import { getSurveys } from "../Questionnaire/QuestionReader";
import "survey-react/survey.css";
import * as Survey from "survey-react";
import EventDashboard from "../EventDashboard/EventDashboard";

class EventSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.eventId,
      userId: sessionStorage.getItem("userId")
    };
  }

  onCompleteComponent = () => {
    this.setState({
      isCompleted: true
    });
  };

  render() {
    Survey.StylesManager.applyTheme("modern");

    var json = {
      questions: getSurveys(this.state.eventId)
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
