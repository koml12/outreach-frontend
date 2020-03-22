import React, { Component } from "react";
import Question from "../Questionnaire/Question";
import {getQuestionnaire} from "../Questionnaire/QuestionReader";
import "survey-react/survey.css";
import * as Survey from "survey-react";
import EventDashboard from "../EventDashboard/EventDashboard";


class EventQuestionnaire extends Component {
    constructor(props){
        super(props)
        this.state = {
            eventId: props.match.params.eventId
        }
    }


    onCompleteComponent = () =>{
        this.setState({
            isCompleted: true
        })
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