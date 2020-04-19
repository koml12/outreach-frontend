import React, { Component } from "react";
import Question from "../Questionnaire/Question";
import { getQuestionnaire } from "../Questionnaire/QuestionReader";
import "survey-react/survey.css";
import * as Survey from "survey-react";
import EventDashboard from "../EventDashboard/EventDashboard";
import Axios from "axios";

class EventQuestionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: props.eventId,
      questions: []
    };
  }

  componentDidMount() {
    let questions = getQuestionnaire(this.props.eventId);
    console.log(questions);
    if (this.state.questions !== questions) {
      this.setState({ questions });
    }
  }

  onCompleteComponent = () => {
    this.props.onComplete();
  };

<<<<<<< Updated upstream
=======
    onCompleteComponent = (survey) =>{
        this.setState({
            isCompleted: true
        })

        console.log("Survey results: " + JSON.stringify(survey.data));
        this.sendToServer(survey.data);
    }

    sendToServer = (data) => {
        var keyArray = Object.keys(data);
        var answerId = this.parseToAnswerId(keyArray, data);
        for(var i = 0; i < answerId.length; i++){
            var json = {
                candidate : parseInt(this.state.userId),
                question : parseInt(keyArray[i]),
                answer : parseInt(answerId[i])
            }
            this.postAnswerToDb(json);

        }

        
    }

    postAnswerToDb = (answerJson) => {
        const url = 'http://localhost:8000/api/answer/';
        Axios.post(url,answerJson).then((response)=>{
          console.log("answer has been saved");
        }, (error)=>{
          console.log(error);
        });
    }

    parseToAnswerId = (keyArray, data) => {
        var answerId = [];
        for(var i = 0; i < keyArray.length; i++){
            var questionObj = getFromApi("question", keyArray[i]);
            for(var j = 0; j < 5; j++){
                if(j == 0) {
                    if(data[keyArray[i]] == questionObj.op1){
                        answerId.push(j);
                        break;
                    }
                } else if( j == 1) {
                    if(data[keyArray[i]] == questionObj.op2){
                        answerId.push(j);
                        break;
                    }
                } else if( j == 2) {
                    if(data[keyArray[i]] == questionObj.op3){
                        answerId.push(j);
                        break;
                    }
                } else if( j == 3) {
                    if(data[keyArray[i]] == questionObj.op4){
                        answerId.push(j);
                        break;
                    }
                } else if( j == 4) {
                    if(data[keyArray[i]] == questionObj.op5){
                        answerId.push(j);
                        break;
                    }
                }
            }
        }
        return answerId;
    }

>>>>>>> Stashed changes
  render() {
    Survey.StylesManager.applyTheme("darkblue");

    var json = {
      questions: this.state.questions
    };

    var questionnaireRender = !this.state.isCompleted ? (
      <Survey.Survey json={json} showCompletedPage={false} onComplete={this.onCompleteComponent} />
    ) : null;

    var onQuestionnaireCompletion = this.state.isCompleted ? <div> Thanks for completing the questionnaire</div> : null;

    /* questionnaireRender.onComplete.add(function(result){
            document.querySelector('#surveyResult').textContent =
                JSON.stringify(result.data, null, 3);
            
        }); */

    return (
      <div className="App">
        <div>
          {questionnaireRender}
          {onQuestionnaireCompletion}
        </div>
      </div>
    );
  }
}
export default EventQuestionnaire;
