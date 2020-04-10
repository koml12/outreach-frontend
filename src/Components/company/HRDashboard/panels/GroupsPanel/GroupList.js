import React, { useState } from "react";

import GroupListItem from "./GroupListItem";

const GroupList = (props) => {
  const { groups, registrations, evaluators, onEditGroup, onDeleteGroup, onRemoveRegistration } = props;
  const [expandedGroupId, setExpandedGroupId] = useState(null);

  const onGroupExpanded = (groupId) => {
    if (groupId === expandedGroupId) {
      setExpandedGroupId(null);
    } else {
      setExpandedGroupId(groupId);
    }
  };

  const getRegistrationsForGroup = (group) => {
    return registrations.filter((registrations) => group.candidates.includes(registrations.id));
  };

  const getEvaluatorForGroup = (group) => {
    return evaluators.find((evaluator) => evaluator.id === group.evaluator);
  };

  return (
    <div>
      {groups.map((group) => (
        <GroupListItem
          id={group.id}
          name={group.name}
          event={group.event}
          registrations={getRegistrationsForGroup(group)}
          evaluator={getEvaluatorForGroup(group)}
          expanded={group.id === expandedGroupId}
          onExpandedChange={() => onGroupExpanded(group.id)}
          onRemoveRegistration={onRemoveRegistration}
          onEdit={onEditGroup}
          onDelete={onDeleteGroup}
        />
      ))}
    </div>
  );
};

export default GroupList;
