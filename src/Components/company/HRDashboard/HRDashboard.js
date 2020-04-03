import React, { useState } from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TabPanel from "./TabPanel";
import {
  CandidatesPanel,
  EventsPanel,
  GroupsPanel,
  QuestionnairesPanel,
  RankingsPanel,
  AnalyticsPanel
} from "./panels";

const TabNames = {
  CANDIDATES: 0,
  EVENTS: 1,
  GROUPS: 2,
  QUESTIONNAIRES: 3,
  RANKINGS: 4,
  ANALYTICS: 5
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
        <Tab label="Questionnaires" />
        <Tab label="Rankings" />
        <Tab label="Analytics" />
      </Tabs>

      <TabPanel value={value} index={TabNames.CANDIDATES}>
        <CandidatesPanel />
      </TabPanel>

      <TabPanel value={value} index={TabNames.EVENTS}>
        <EventsPanel />
      </TabPanel>

      <TabPanel value={value} index={TabNames.GROUPS}>
        <GroupsPanel />
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
