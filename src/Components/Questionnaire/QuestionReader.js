import Question from "../Questionnaire/Question";

//var questionCollection = [];
const QUESTIONNAIRE = "questionnaire";
const SURVEY = "survey";

function getFromApi(typeOfData, id) {
  var Http = new XMLHttpRequest();
  let url = "";
  if (typeOfData === "question") {
    url = "http://localhost:8000/api/question/" + id + "/?format=json";
    console.log(url);
    Http.open("GET", url, false);
    Http.send(null);
    return JSON.parse(Http.responseText);
  } else {
    url = "http://localhost:8000/api/" + typeOfData + "/?eventId=" + id + "&format=json";
    Http.open("GET", url, false);
    Http.send(null);
    return JSON.parse(Http.responseText)[0];
  }
}

function getQuestionnaire(eventID) {
  //api call to get list of qs
  //debugger;
  let questionCollection = extractQuestions(QUESTIONNAIRE, eventID);
  return jsonifyQuestions(questionCollection);
}

function getSurveys(eventID) {
  let questionCollection = extractQuestions(SURVEY, eventID);
  return jsonifyQuestions(questionCollection);
}

function extractQuestions(typeOfData, eventID) {
  var jsonObject = getFromApi(typeOfData, eventID);
  //jsonObject.questions;
  let questionCollection = [];
  for (var i = 0; i < jsonObject.questions.length; i++) {
    var questionObj = jsonObject.questions[i];
    var questionId = questionObj.id + "";
    var answers = [questionObj.op1, questionObj.op2, questionObj.op3, questionObj.op4, questionObj.op5];

    let q = new Question(questionObj.text, answers, questionId);
    if (!questionCollection.includes(q)) {
      questionCollection.push(q);
    }
  }
  return questionCollection;
}

function jsonifyQuestions(questionCollection) {
  var jsonArray = [];
  for (var i = 0; i < questionCollection.length; i++) {
    console.log(questionCollection[i]);
    var temp = {
      type: "radiogroup",
      name: questionCollection[i].questionId,
      title: questionCollection[i].questionText,
      isRequired: true,
      colCount: 5,
      choices: questionCollection[i].answerArray,
    };
    jsonArray = jsonArray.concat(temp);
  }
  return jsonArray;
}

function getQuestions() {
  // return questionCollection;
}

export { getQuestionnaire, getSurveys, getQuestions, getFromApi };
