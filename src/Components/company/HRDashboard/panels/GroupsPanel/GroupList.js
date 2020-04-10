import React, { useState } from "react";

import GroupListItem from "./GroupListItem";

const GroupList = (props) => {
  const { groups } = props;
  const [expandedGroupId, setExpandedGroupId] = useState(null);

  const onGroupExpanded = (groupId) => {
    if (groupId === expandedGroupId) {
      setExpandedGroupId(null);
    } else {
      setExpandedGroupId(groupId);
    }
  };

  return (
    <div>
      {groups.map((group) => (
        <GroupListItem
          {...group}
          expanded={group.id === expandedGroupId}
          onExpandedChange={() => onGroupExpanded(group.id)}
        />
      ))}
    </div>
  );
};

export default GroupList;
