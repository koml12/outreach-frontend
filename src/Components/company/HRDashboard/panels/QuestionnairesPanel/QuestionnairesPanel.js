import React, { Component } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";

import QuestionnaireCard from "./QuestionnaireCard";
import QuestionnaireDetail from "./QuestionnaireDetail";
import AddEditQuestionnaireModal from "./AddEditQuestionnaireModal";
import AddButton from "../AddButton";
import DeleteQuestionnaireModal from "./DeleteQuestionnaireModal";

import { getToken } from "../../../../../utils/utils";

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
    this.handleAddQuestionnaireClicked = this.handleAddQuestionnaireClicked.bind(this);
    this.handleEditQuestionnaireClicked = this.handleEditQuestionnaireClicked.bind(this);
    this.handleDeleteQuestionnaireClicked = this.handleDeleteQuestionnaireClicked.bind(this);
    this.handleModalsClose = this.handleModalsClose.bind(this);
    this.handleBackButtonClicked = this.handleBackButtonClicked.bind(this);
    this.handleViewQuestionsClicked = this.handleViewQuestionsClicked.bind(this);
    this.createQuestionnaire = this.createQuestionnaire.bind(this);
    this.deleteQuestionnaire = this.deleteQuestionnaire.bind(this);
    this.addQuestionnaireToEvents = this.addQuestionnaireToEvents.bind(this);
  }

  componentDidMount() {
    this.getAllQuestionnaires();
    this.getAllSurveys();
    this.getAllEvents();
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

  getAllEvents() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/event/",
    }).then((response) => {
      const events = response.data;
      this.setState({ events });
    });
  }

  handleAddQuestionnaireClicked() {
    this.setState({ showAddEditModal: true });
  }

  handleEditQuestionnaireClicked(questionnaire) {
    this.setState({ showAddEditModal: true, modifyingQuestionnaire: questionnaire });
  }

  handleDeleteQuestionnaireClicked(questionnaire) {
    this.setState({ showDeleteModal: true, modifyingQuestionnaire: questionnaire });
  }

  handleModalsClose() {
    this.setState({ showAddEditModal: false, showDeleteModal: false, modifyingQuestionnaire: null });
  }

  handleBackButtonClicked() {
    this.setState({ selectedQuestionnaire: null });
  }

  handleViewQuestionsClicked(questionnaire) {
    this.setState({ selectedQuestionnaire: questionnaire });
  }

  createQuestionnaire(questionnaire, selectedEvents) {
    const selectedEventIds = selectedEvents.map((e) => e.id);
    let questionnaireId = questionnaire.id;
    let questionnaireType = questionnaire.type;
    axios({
      method: questionnaireId ? "patch" : "post",
      url: `http://localhost:8000/api/${questionnaire.type}/${questionnaireId ? questionnaireId + "/" : ""}`,
      data: questionnaire,
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then((response) => {
      this.addQuestionnaireToEvents(selectedEventIds, response.data.id, questionnaireType);
      let createdQuestionnaire = { ...response.data, type: questionnaireType, events: selectedEventIds };
      let questionnaires;
      if (questionnaireId) {
        const foundIndex = this.state.questionnaires.findIndex((q) => q.id === questionnaire.id);
        questionnaires = [
          ...this.state.questionnaires.slice(0, foundIndex),
          createdQuestionnaire,
          ...this.state.questionnaires.slice(foundIndex + 1),
        ];
      } else {
        questionnaires = [...this.state.questionnaires, createdQuestionnaire];
      }
      this.setState({ questionnaires });
    });
  }

  deleteQuestionnaire(questionnaire) {
    axios({
      method: "delete",
      url: `http://localhost:8000/api/${questionnaire.type}/${questionnaire.id}/`,
    }).then(() => {
      const foundIndex = this.state.questionnaires.findIndex((q) => q.id === questionnaire.id);
      const questionnaires = [
        ...this.state.questionnaires.slice(0, foundIndex),
        ...this.state.questionnaires.slice(foundIndex + 1),
      ];
      this.setState({ questionnaires });
      this.handleModalsClose();
    });
  }

  addQuestionnaireToEvents(eventIds, questionnaireId, type) {
    let addData = {};
    addData[type] = questionnaireId;
    const eventPromises = eventIds.map((eventId) => {
      return axios({
        method: "patch",
        url: `http://localhost:8000/api/event/${eventId}/`,
        data: {
          [type]: questionnaireId,
        },
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      });
    });

    let removeData = {};
    removeData[type] = null;
    const removedPromises = this.state.events
      .filter((event) => event[type] === questionnaireId && !eventIds.includes(event.id))
      .map((event) => {
        return axios({
          method: "patch",
          url: `http://localhost:8000/api/event/${event.id}/`,
          data: {
            [type]: null,
          },
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        });
      });
    axios.all([...eventPromises, ...removedPromises]).then(() => this.handleModalsClose());
  }

  getEventDataForIds(eventIds, events) {
    return eventIds.map((eventId) => events.find((e) => e.id === eventId));
  }

  getInitialData(questionnaire, events) {
    if (!questionnaire) {
      return null;
    }
    const eventData = this.getEventDataForIds(questionnaire.events, events);
    return { ...questionnaire, events: eventData };
  }

  getAvailableEvents(questionnaires, events) {
    const claimedQuestionnaireEvents = questionnaires
      .filter((q) => q.type === "questionnaire")
      .map((q) => q.events)
      .reduce((prev, curr) => prev.concat(curr), []);

    const claimedSurveyEvents = questionnaires
      .filter((q) => q.type === "survey")
      .map((q) => q.events)
      .reduce((prev, curr) => prev.concat(curr), []);

    return {
      questionnaire: events.filter((event) => !claimedQuestionnaireEvents.includes(event.id)),
      survey: events.filter((event) => !claimedSurveyEvents.includes(event.id)),
    };
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
            {this.state.showAddEditModal && (
              <AddEditQuestionnaireModal
                open={this.state.showAddEditModal}
                onClose={this.handleModalsClose}
                initialData={this.getInitialData(this.state.modifyingQuestionnaire, this.state.events)}
                onSubmit={this.createQuestionnaire}
                questionnaireEvents={
                  this.getAvailableEvents(this.state.questionnaires, this.state.events).questionnaire
                }
                surveyEvents={this.getAvailableEvents(this.state.questionnaires, this.state.events).survey}
              />
            )}

            {this.state.showDeleteModal && this.state.modifyingQuestionnaire !== null && (
              <DeleteQuestionnaireModal
                open={this.state.showDeleteModal}
                onClose={this.handleModalsClose}
                onDelete={() => this.deleteQuestionnaire(this.state.modifyingQuestionnaire)}
                name={this.state.modifyingQuestionnaire.name}
                type={this.state.modifyingQuestionnaire.type}
              />
            )}

            <Grid container spacing={2}>
              {this.state.questionnaires.map((questionnaire) => (
                <Grid item xs={4}>
                  <QuestionnaireCard
                    {...questionnaire}
                    onEditClicked={() => this.handleEditQuestionnaireClicked(questionnaire)}
                    onDeleteClicked={() => this.handleDeleteQuestionnaireClicked(questionnaire)}
                    onViewDetailsClicked={() => this.handleViewQuestionsClicked(questionnaire)}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
        <AddButton onClick={this.handleAddQuestionnaireClicked} />
      </div>
    );
  }
}
