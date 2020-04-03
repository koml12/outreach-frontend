import React from "react";

const TabPanel = props => {
  const { children, value, index } = props;
  return value === index && children;
};

export default TabPanel;
