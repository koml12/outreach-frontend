import React, { Component } from "react";
import Question from "../Questionnaire/Question";
import {getQuestionnaire, getFromApi} from "../Questionnaire/QuestionReader";
import "survey-react/survey.css";
import * as Survey from "survey-react";
import EventDashboard from "../EventDashboard/EventDashboard";


class EventQuestionnaire extends Component {
    constructor(props){
        super(props)
        this.state = {
            eventId: props.match.params.eventId,
            userId: sessionStorage.getItem("userId")
        }
    }


    onCompleteComponent = (survey) =>{
        this.setState({
            isCompleted: true
        })

        console.log("Survey results: " + JSON.stringify(survey.data));
        this.sendToServer(survey.data);
    }

    sendToServer = (data) => {
        var keyArray = Object.keys(data);
        //var questionObj = getFromApi("question", jsonObject.questions[i]);
        var answerId = this.parseToAnswerId(keyArray, data);
        debugger;
        for(var i = 0; i < answerId.length; i++){
            var json = {
                candidate : "" + this.state.userId,
                evaluator : "",
                question : "" + keyArray[i],
                answer : "" + answerId[i]
            }
            this.postAnswerToDb(json);

        }

        
    }

    postAnswerToDb = (answerJson) => {
        var Http = new XMLHttpRequest();
        const url = 'http://localhost:8000/api/answer/';
        Http.open("POST", url, false);
        Http.send(answerJson);
        console.log("Answer Posted");
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

    render(){
        Survey.StylesManager.applyTheme("darkblue");

        var json = {
            questions: getQuestionnaire(this.state.eventId)};

        
        
        var questionnaireRender = !this.state.isCompleted ? (
            <Survey.Survey 
                json = {json}
                showCompletedPage = {false}
                onComplete = {this.onCompleteComponent}
            />
        ) : null
        
        
        var onQuestionnaireCompletion = this.state.isCompleted ? (
            <div> Thanks for completing the questionnaire</div>
        ) : null
        
        /* questionnaireRender.onComplete.add(function(result){
            document.querySelector('#surveyResult').textContent =
                JSON.stringify(result.data, null, 3);
            
        }); */
        

        return(
            <div className = "App">
                <div>
                    {questionnaireRender}
                    {onQuestionnaireCompletion}
                </div>
            </div>
        )
    }
}
export default EventQuestionnaire;