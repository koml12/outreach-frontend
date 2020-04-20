import React from "react";

const TabPanel = (props) => {
  const { children, value, index } = props;
  return value === index && <div>{children}</div>;
};

export default TabPanel;
