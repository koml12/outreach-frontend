import React from 'react';
import {Paper, Tabs} from 'material-ui/';
import Tab from 'material-ui/Tabs';

export default props =>
    <Paper>
        <Tabs
        value = {0}
        indicatorColor = "primary"
        textColor = "primary"
        centered
        >
            <Tab label = "Home"/>
            <Tab label = "Resume Bank"/>
            <Tab label = "Events"/>
            <Tab label = "Profile"/>
        </Tabs>
    </Paper>