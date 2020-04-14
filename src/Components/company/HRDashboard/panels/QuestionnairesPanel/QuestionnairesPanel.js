import React, { Component } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";

import QuestionnaireCard from "./QuestionnaireCard";
import QuestionnaireDetail from "./QuestionnaireDetail";

export default class QuestionnairesPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionnaires: [],
      events: [],
      selectedQuestionnaire: null,
      modifyingQuestionnaire: null,
      showAddEditModal: false,
      showDeleteModal: false,
    };
    this.getAllQuestionnaires = this.getAllQuestionnaires.bind(this);
    this.getAllSurveys = this.getAllSurveys.bind(this);
    this.getAllEvents = this.getAllEvents.bind(this);
    this.handleBackButtonClicked = this.handleBackButtonClicked.bind(this);
    this.handleViewQuestionsClicked = this.handleViewQuestionsClicked.bind(this);
  }

  componentDidMount() {
    this.getAllQuestionnaires();
    this.getAllSurveys();
  }

  getAllQuestionnaires() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/questionnaire/",
    }).then((response) => {
      const questionnaires = [
        ...this.state.questionnaires,
        ...response.data.map((questionnaire) => {
          return { ...questionnaire, type: "questionnaire" };
        }),
      ].sort((a, b) => a.id - b.id);
      this.setState({ questionnaires });
    });
  }

  getAllSurveys() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/survey/",
    }).then((response) => {
      const questionnaires = [
        ...this.state.questionnaires,
        ...response.data.map((questionnaire) => {
          return { ...questionnaire, type: "survey" };
        }),
      ].sort((a, b) => a.id - b.id);
      this.setState({ questionnaires });
    });
  }

  getAllEvents() {}

  handleBackButtonClicked() {
    this.setState({ selectedQuestionnaire: null });
  }

  handleViewQuestionsClicked(questionnaire) {
    this.setState({ selectedQuestionnaire: questionnaire });
  }

  render() {
    return (
      <div>
        {this.state.selectedQuestionnaire ? (
          <QuestionnaireDetail
            questionnaire={this.state.selectedQuestionnaire}
            onBackClicked={this.handleBackButtonClicked}
          />
        ) : (
          <div>
            <Grid container spacing={2}>
              {this.state.questionnaires.map((questionnaire) => (
                <Grid item xs={4}>
                  <QuestionnaireCard
                    {...questionnaire}
                    onViewDetailsClicked={() => this.handleViewQuestionsClicked(questionnaire)}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}
