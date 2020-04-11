import React, { useState } from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import TabPanel from "./TabPanel";
import {
  CandidatesPanel,
  EventsPanel,
  GroupsPanel,
  JobsPanel,
  QuestionnairesPanel,
  RankingsPanel,
  AnalyticsPanel,
} from "./panels";

const TabNames = {
  CANDIDATES: 0,
  EVENTS: 1,
  GROUPS: 2,
  JOBS: 3,
  QUESTIONNAIRES: 4,
  RANKINGS: 5,
  ANALYTICS: 6,
};

const HRDashboard = () => {
  let [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs indicatorColor="primary" textColor="primary" centered value={value} onChange={handleTabChange}>
        <Tab label="Candidates" />
        <Tab label="Events" />
        <Tab label="Groups" />
        <Tab label="Jobs" />
        <Tab label="Questionnaires" />
        <Tab label="Rankings" />
        <Tab label="Analytics" />
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

      <TabPanel value={value} index={TabNames.RANKINGS}>
        <RankingsPanel />
      </TabPanel>

      <TabPanel value={value} index={TabNames.ANALYTICS}>
        <AnalyticsPanel />
      </TabPanel>
    </div>
  );
};

export default HRDashboard;
