import React, { Component } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";

import QuestionnaireCard from "./QuestionnaireCard";

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

  render() {
    return (
      <div>
        <div>
          <Grid container spacing={2}>
            {this.state.questionnaires.map((questionnaire) => (
              <Grid item xs={4}>
                <QuestionnaireCard {...questionnaire} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}
