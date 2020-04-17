import React, { Component } from "react";
import axios from "axios";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";

import QuestionnnaireInfo from "./QuestionnaireInfo";
import QuestionList from "./QuestionList";
import DeleteQuestionModal from "./DeleteQuestionModal";
import AddQuestionButton from "./AddQuestionButton";

import { getToken } from "../../../../../utils/utils";

class QuestionnaireDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.questionnaire.id,
      name: props.questionnaire.name,
      type: props.questionnaire.type,
      events: props.questionnaire.events,
      question: [],
      // questions: props.questionnaire.questions,
      addingQuestion: false,
      showDeleteModal: false,
    };
    this.getAllQuestions = this.getAllQuestions.bind(this);
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.handleSaveQuestion = this.handleSaveQuestion.bind(this);
    this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
    this.handleAddCancel = this.handleAddCancel.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.handleModalsClose = this.handleModalsClose.bind(this);
  }

  componentDidMount() {
    this.getAllQuestions(this.props.questionnaire.id, this.props.questionnaire.type);
  }

  getAllQuestions(questionnaireId, type) {
    axios({
      method: "get",
      url: `http://localhost:8000/api/${type}/${questionnaireId}/`,
    }).then((response) => {
      const { questions } = response.data;
      this.setState({ questions });
    });
  }

  handleAddQuestion() {
    this.setState({ addingQuestion: true });
  }

  handleSaveQuestion(question) {
    const questionId = question.id;

    axios({
      method: questionId ? "patch" : "post",
      url: `http://localhost:8000/api/question/${questionId ? questionId + "/" : ""}`,
      data: {
        ...question,
        questionnaire: this.props.questionnaire.id,
      },
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then((response) => {
      const createdQuestion = {
        ...response.data,
        questionnaire: this.state.id,
        type: this.state.type,
      };
      let questions = [];
      if (questionId) {
        const foundIndex = this.state.questions.findIndex((q) => q.id === questionId);
        questions = [
          ...this.state.questions.slice(0, foundIndex),
          createdQuestion,
          ...this.state.questions.slice(foundIndex + 1),
        ];
      } else {
        questions = [...this.state.questions, createdQuestion];
        this.setState({ addingQuestion: false });
      }

      this.setState({ questions });
    });
  }

  handleDeleteQuestion(question) {
    this.setState({ modifyingQuestion: question, showDeleteModal: true });
  }

  handleAddCancel() {
    this.setState({ addingQuestion: false });
  }

  deleteQuestion(question) {
    const foundIndex = this.state.questions.findIndex((q) => q.id === question.id);
    const questions = [...this.state.questions.slice(0, foundIndex), ...this.state.questions.slice(foundIndex + 1)];
    this.setState({ questions });
    this.handleModalsClose();
  }

  handleModalsClose() {
    this.setState({ modifyingQuestion: null, showDeleteModal: false });
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.props.onBackClicked}>
          <ArrowBackTwoToneIcon fontSize="large" />
        </IconButton>
        <QuestionnnaireInfo name={this.state.name} type={this.state.type} events={this.state.events} />

        {this.state.showDeleteModal && this.state.modifyingQuestion !== null && (
          <DeleteQuestionModal
            open={this.state.showDeleteModal}
            onClose={this.handleModalsClose}
            onDelete={() => this.deleteQuestion(this.state.modifyingQuestion)}
            name={this.state.modifyingQuestion.text}
          />
        )}

        <QuestionList
          questions={this.state.questions}
          type={this.state.type}
          addingQuestion={this.state.addingQuestion}
          onSave={this.handleSaveQuestion}
          onDelete={this.handleDeleteQuestion}
          onAddCancel={this.handleAddCancel}
        />
        {!this.state.addingQuestion && <AddQuestionButton onClick={this.handleAddQuestion} />}
      </div>
    );
  }
}

export default QuestionnaireDetail;
