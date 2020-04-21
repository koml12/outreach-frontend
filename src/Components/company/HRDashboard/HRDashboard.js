import React, { useState } from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import TabPanel from "./TabPanel";
import { CandidatesPanel, EventsPanel, GroupsPanel, JobsPanel, QuestionnairesPanel } from "./panels";

const TabNames = {
  CANDIDATES: 1,
  EVENTS: 0,
  GROUPS: 2,
  JOBS: 3,
  QUESTIONNAIRES: 4,
};

const HRDashboard = () => {
  let [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs indicatorColor="primary" textColor="primary" centered value={value} onChange={handleTabChange}>
        <Tab label="Events" />
        <Tab label="Candidates" />
        <Tab label="Groups" />
        <Tab label="Jobs" />
        <Tab label="Questionnaires" />
      </Tabs>

      <Box marginBottom="24px" />

      <TabPanel value={value} index={TabNames.CANDIDATES}>
        <CandidatesPanel />
      </TabPanel>

      <TabPanel value={value} index={TabNames.EVENTS}>
        <EventsPanel />
      </TabPanel>

      <TabPanel value={value} index={TabNames.GROUPS}>
        <GroupsPanel />
      </TabPanel>

      <TabPanel value={value} index={TabNames.JOBS}>
        <JobsPanel />
      </TabPanel>

      <TabPanel value={value} index={TabNames.QUESTIONNAIRES}>
        <QuestionnairesPanel />
      </TabPanel>
    </div>
  );
};

export default HRDashboard;
