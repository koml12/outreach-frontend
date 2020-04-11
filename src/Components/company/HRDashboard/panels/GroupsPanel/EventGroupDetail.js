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
    this.getEditData = this.getEditData.bind(this);
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
    let groupId = group.id;
    console.log(groupWithEvent);
    axios({
      method: group.id ? "patch" : "post",
      url: `http://localhost:8000/api/group/${group.id ? group.id + "/" : ""}`,
      data: groupWithEvent,
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then((response) => {
      this.registerCandidatesToGroup(response.data.id, registrations, groupId === true);
      let createdGroup = { ...response.data, candidates: registrations.map((registration) => registration.id) };
      let groups;
      if (groupId) {
        const foundIndex = this.state.groups.findIndex((g) => g.id === groupId);
        groups = [...this.state.groups.slice(0, foundIndex), createdGroup, ...this.state.groups.slice(foundIndex + 1)];
      } else {
        groups = [...this.state.groups, createdGroup];
      }

      console.log(groups);
      this.setState({ groups });
    });
  }

  registerCandidatesToGroup(groupId, registrations, groupExists) {
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
    const uncheckedRegistrations = this.state.registrations
      .filter((registration) => registration.group === groupId && !registrations.includes(registration))
      .map((registration) => {
        return axios({
          method: "patch",
          url: `http://localhost:8000/api/registration/${registration.id}/`,
          data: {
            group: null,
          },
          headers: {
            Authorization: `Token ${getToken()}`,
          },
        });
      });
    axios.all([...promises, ...uncheckedRegistrations]).then(() => this.handleModalClose());
  }

  getAvailableEvaluators(evaluators, groups, modifyingGroup) {
    const modifyingEvaluator = modifyingGroup ? modifyingGroup.evaluator.id : null;
    const claimedEvaluators = groups.map((group) => group.evaluator);
    return evaluators.filter(
      (evaluator) => !claimedEvaluators.includes(evaluator.id) || evaluator.id === modifyingEvaluator
    );
  }

  getAvailableRegistrations(registrations, groups) {
    const claimedCandidates = groups.map((group) => group.candidates).reduce((prev, curr) => prev.concat(curr), []);
    console.log(claimedCandidates);
    return registrations.filter((registration) => !claimedCandidates.includes(registration.id));
  }

  handleEditGroup(group) {
    this.setState({ showAddModal: true, modifyingGroup: group });
  }

  handleDeleteGroup(group) {
    this.setState({ showDeleteModal: true, modifyingGroup: group });
  }

  handleRemoveRegistration(group, registration) {
    axios({
      method: "patch",
      url: `http://localhost:8000/api/registration/${registration.id}/`,
      data: {
        group: null,
      },
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    }).then(() => {
      const foundIndex = this.state.groups.findIndex((g) => g.id === group.id);
      const candidates = group.candidates.filter((registrationId) => registrationId !== registration.id);
      const newGroup = {
        id: group.id,
        name: group.name,
        evaluator: group.evaluator.id,
        event: group.event,
        candidates,
      };
      console.log(newGroup);
      const groups = [...this.state.groups.slice(0, foundIndex), newGroup, ...this.state.groups.slice(foundIndex + 1)];
      this.setState({ groups });
    });
  }

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

  getEditData() {
    if (!this.state.modifyingGroup) {
      return null;
    }
    const { modifyingGroup } = this.state;
    return {
      id: modifyingGroup.id,
      name: modifyingGroup.name,
      evaluator: modifyingGroup.evaluator.id,
      registrations: this.state.registrations.filter((r) => modifyingGroup.candidates.includes(r.id)),
    };
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
            evaluators={this.getAvailableEvaluators(
              this.state.evaluators,
              this.state.groups,
              this.state.modifyingGroup
            )}
            registrations={this.getAvailableRegistrations(this.state.registrations, this.state.groups)}
            initialData={this.getEditData()}
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
