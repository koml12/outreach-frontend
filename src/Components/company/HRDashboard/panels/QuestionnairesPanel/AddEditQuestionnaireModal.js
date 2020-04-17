import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

import CloseIcon from "@material-ui/icons/Close";

import EventsChecklist from "./EventsChecklist";

const useStyles = makeStyles({
  closeButton: {
    position: "absolute",
    right: "8px",
    top: "8px",
  },
});

const AddEditQuestionnaireModal = (props) => {
  const classes = useStyles();
  const { open, onClose, onSubmit, initialData } = props;

  let initialName = "";
  let initialType = "questionnaire";
  let initialSelectedQuestionnaireEvents = [];
  let initialSelectedSurveyEvents = [];
  if (initialData) {
    initialName = initialData.name;
    initialType = initialData.type;
    if (initialType === "questionnaire") {
      initialSelectedQuestionnaireEvents = initialData.events;
    } else if (initialType === "survey") {
      initialSelectedSurveyEvents = initialData.events;
    }
  }

  const [name, setName] = useState(initialName);
  const [type, setType] = useState(initialType);
  const [selectedQuestionnaireEvents, setSelectedQuestionnaireEvents] = useState(initialSelectedQuestionnaireEvents);
  const [selectedSurveyEvents, setSelectedSurveyEvents] = useState(initialSelectedSurveyEvents);

  const questionnaireEvents = [...new Set([...props.questionnaireEvents, ...initialSelectedQuestionnaireEvents])];
  const surveyEvents = [...new Set([...props.surveyEvents, ...initialSelectedSurveyEvents])];

  const onEventSelected = (event) => {
    let selectedEvents;
    if (type === "questionnaire") {
      selectedEvents = selectedQuestionnaireEvents;
    } else if (type === "survey") {
      selectedEvents = selectedSurveyEvents;
    }

    let newSelectedEvents;
    if (selectedEvents.includes(event)) {
      const foundIndex = selectedEvents.indexOf(event);
      newSelectedEvents = [...selectedEvents.slice(0, foundIndex), ...selectedEvents.slice(foundIndex + 1)];
    } else {
      newSelectedEvents = [...selectedEvents, event];
    }

    if (type === "questionnaire") {
      setSelectedQuestionnaireEvents(newSelectedEvents);
    } else if (type === "survey") {
      setSelectedSurveyEvents(newSelectedEvents);
    }
  };

  const onQuestionnaireSubmitted = () => {
    const questionnaire = {
      id: initialData ? initialData.id : null,
      name: name,
      type: type,
    };
    const selectedEvents = type === "questionnaire" ? selectedQuestionnaireEvents : selectedSurveyEvents;
    onSubmit(questionnaire, selectedEvents);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {initialData ? "Edit Questionnaire" : "Create A New Questionnaire"}
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Type</FormLabel>
              <RadioGroup row value={type} onChange={(e) => setType(e.target.value)}>
                <FormControlLabel
                  value="questionnaire"
                  control={<Radio />}
                  label="Candidate Questions"
                  disabled={initialData !== null}
                />
                <FormControlLabel
                  value="survey"
                  control={<Radio />}
                  label="Evaluation Questions"
                  disabled={initialData !== null}
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <EventsChecklist
              events={type === "questionnaire" ? questionnaireEvents : surveyEvents}
              selectedEvents={type === "questionnaire" ? selectedQuestionnaireEvents : selectedSurveyEvents}
              onEventSelected={onEventSelected}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onQuestionnaireSubmitted}>
          {initialData ? "Update" : "Create"} Questionnaire
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditQuestionnaireModal;
