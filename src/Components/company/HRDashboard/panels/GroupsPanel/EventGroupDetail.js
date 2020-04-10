import React, { Component } from "react";
import axios from "axios";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackTwoToneIcon from "@material-ui/icons/ArrowBackTwoTone";
import { EventInfo } from "../../../../common";
import GroupList from "./GroupList";
import AddButton from "../AddButton";
import AddGroupModal from "./AddGroupModal";
import DeleteGroupModal from "./DeleteGroupModal";

import { getToken } from "../../../../../utils/utils";

class EventGroupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        id: props.event["id"],
        name: props.event["Event Name"],
        description: props.event["Description"],
        startDatetime: props.event["Start Time"],
        endDatetime: props.event["End Time"],
      },
      eventId: props.event.id,
      groups: [],
      evaluators: [],
      registrations: [],
      modifyingGroup: null,
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
    };
    this.getGroupsForEvent = this.getGroupsForEvent.bind(this);
    this.getAllEvaluators = this.getAllEvaluators.bind(this);
    this.getRegisteredCandidates = this.getRegisteredCandidates.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.registerCandidatesToGroup = this.registerCandidatesToGroup.bind(this);
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
    this.handleEditGroup = this.handleEditGroup.bind(this);
    this.handleRemoveRegistration = this.handleRemoveRegistration.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  componentDidMount() {
    this.getGroupsForEvent(this.props.event.id);
    this.getAllEvaluators();
    this.getRegisteredCandidates(this.props.event.id);
  }

  getGroupsForEvent(eventId) {
    axios({
      method: "get",
      url: `http://localhost:8000/api/group/?event=${eventId}`,
    }).then((response) => {
      const groups = response.data;
      this.setState({ groups });
    });
  }

  getAllEvaluators() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/evaluators/",
    }).then((response) => {
      const evaluators = response.data;
      this.setState({ evaluators });
    });
  }

  getRegisteredCandidates(eventId) {
    axios({
      method: "get",
      url: `http://localhost:8000/api/registration/?event=${eventId}`,
    }).then((response) => {
      const registrations = response.data;
      this.setState({ registrations });
    });
  }

  handleAddButtonClick() {
    this.setState({ showAddModal: true });
  }

  handleModalClose() {
    this.setState({ showAddModal: false, showEditModal: false, showDeleteModal: false, modifyingGroup: null });
  }

  createGroup(group, registrations) {
    //this.handleModalClose();
    let groupWithEvent = { ...group, event: this.props.event.id };
    axios({
      method: "post",
      url: "http://localhost:8000/api/group/",
      data: groupWithEvent,
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then((response) => {
      const group = response.data;
      const { id } = group;
      this.registerCandidatesToGroup(id, registrations);
      const groups = [
        ...this.state.groups,
        { ...group, candidates: registrations.map((registration) => registration.id) },
      ];
      console.log(groups);
      this.setState({ groups });
    });
  }

  registerCandidatesToGroup(groupId, registrations) {
    const promises = registrations.map((registration) => {
      return axios({
        method: "patch",
        url: `http://localhost:8000/api/registration/${registration.id}/`,
        data: {
          group: groupId,
        },
        headers: {
          Authorization: `Token ${getToken()}`,
        },
      });
    });
    axios.all(promises).then(() => this.handleModalClose());
  }

  getAvailableEvaluators(evaluators, groups) {
    const claimedEvaluators = groups.map((group) => group.evaluator);
    return evaluators.filter((evaluator) => !claimedEvaluators.includes(evaluator.id));
  }

  getAvailableRegistrations(registrations, groups) {
    const claimedCandidates = groups.map((group) => group.candidates).reduce((prev, curr) => prev.concat(curr), []);
    console.log(claimedCandidates);
    return registrations.filter((registration) => !claimedCandidates.includes(registration.candidate.id));
  }

  handleEditGroup(group, evaluator, registrations) {
    this.setState({ showEditModal: true, modifyingGroup: group });
  }

  handleDeleteGroup(group) {
    this.setState({ showDeleteModal: true, modifyingGroup: group });
  }

  handleRemoveRegistration(group, registration) {}

  deleteGroup(groupId) {
    axios({
      method: "delete",
      url: `http://localhost:8000/api/group/${groupId}/`,
    }).then(() => {
      const foundIndex = this.state.groups.findIndex((g) => g.id === groupId);
      const groups = [...this.state.groups.slice(0, foundIndex), ...this.state.groups.slice(foundIndex + 1)];
      this.setState({ groups, showDeleteModal: false, modifyingGroup: null });
    });
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.props.onBackClicked}>
          <ArrowBackTwoToneIcon fontSize="large" />
        </IconButton>
        {this.state.showAddModal && (
          <AddGroupModal
            open={this.state.showAddModal}
            onClose={this.handleModalClose}
            onSubmit={this.createGroup}
            evaluators={this.getAvailableEvaluators(this.state.evaluators, this.state.groups)}
            registrations={this.getAvailableRegistrations(this.state.registrations, this.state.groups)}
          />
        )}

        {this.state.showDeleteModal && this.state.modifyingGroup !== null && (
          <DeleteGroupModal
            open={this.state.showDeleteModal}
            name={this.state.modifyingGroup.name}
            onDelete={() => this.deleteGroup(this.state.modifyingGroup.id)}
            onClose={this.handleModalClose}
          />
        )}

        <EventInfo event={this.state.event} />
        <GroupList
          groups={this.state.groups}
          registrations={this.state.registrations}
          evaluators={this.state.evaluators}
          onEditGroup={this.handleEditGroup}
          onDeleteGroup={this.handleDeleteGroup}
          onRemoveRegistration={this.handleRemoveRegistration}
        />
        <AddButton onClick={this.handleAddButtonClick} />
      </div>
    );
  }
}

export default EventGroupDetail;
