import Question from "../Questionnaire/Question";

var questionCollection = [];
const QUESTIONNAIRE = "questionnaire";
const SURVEY = "survey";


function getFromApi(typeOfData, id){


    var Http = new XMLHttpRequest();
    const url = 'http://localhost:8000/api/'+typeOfData+'/'+id+'/?format=json';
    Http.open("GET", url, false);
    Http.send(null);
    return JSON.parse(Http.responseText);
}

function getQuestionnaire(eventID){
    //api call to get list of qs
    //debugger;
    extractQuestions(QUESTIONNAIRE, eventID);
    return jsonifyQuestions();
}

function getSurveys(eventID){
    extractQuestions(SURVEY,eventID);
    return jsonifyQuestions();
}

function extractQuestions(typeOfData, eventID){
    var jsonObject = getFromApi(typeOfData, eventID);
    //jsonObject.questions;
    for(var i = 0; i < jsonObject.questions.length; i++){

        var questionObj = getFromApi("question", jsonObject.questions[i]);
        var questionId = questionObj.questionId;
        var answers = [questionObj.op1, questionObj.op2, questionObj.op3, 
            questionObj.op4, questionObj.op5];

        let q = new Question(questionObj.text, answers, questionId);
        questionPush(q)
    }
}

function jsonifyQuestions(){
    var jsonArray=[];
    for(var i = 0; i < questionCollection.length; i++){
        var temp = {
            type: "radiogroup",
            name: "q"+(i+1),
            title: questionCollection[i].questionText,
            isRequired: true,
            colCount: 5,
            choices: questionCollection[i].answerArray
        }
            jsonArray = jsonArray.concat(temp);
    }
    return jsonArray;
}

function questionPush(question){
    questionCollection.push(question);
}

function getQuestions(){
    return questionCollection;
}

export {getQuestionnaire, getSurveys, getQuestions};