import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DayJsUtils from "@date-io/dayjs";

import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  closeButton: {
    position: "absolute",
    right: "8px",
    top: "8px",
  },
});

const AddEventModal = (props) => {
  const classes = useStyles();

  console.log(props.event);

  let initialName = "",
    initialDescription = "",
    initialStartDatetime = new Date(),
    initialEndDatetime = new Date();
  if (props.event) {
    initialName = props.event["Event Name"];
    initialDescription = props.event["Description"];
    initialStartDatetime = new Date(props.event["Start Time"]);
    initialEndDatetime = new Date(props.event["End Time"]);
  }
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [startDatetime, setStartDatetime] = useState(initialStartDatetime);
  const [endDatetime, setEndDatetime] = useState(initialEndDatetime);

  const onSubmit = () => {
    const event = {
      id: props.event ? props.event.id : null,
      "Event Name": name,
      Description: description,
      "Start Time": startDatetime,
      "End Time": endDatetime,
    };
    props.onSubmit(event);
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>
        {props.event ? "Edit Event" : "Create A New Event"}
        <IconButton className={classes.closeButton} onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {/* <DialogContentText variant="body2">
          Create your event with a name, description, and times here. You can update details of your event such as
          adding Questionnaires and Surveys later from the Events page.
        </DialogContentText> */}

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Event Name"
              fullWidth
              margin="dense"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="description"
              label="Description"
              fullWidth
              multiline
              margin="dense"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <MuiPickersUtilsProvider utils={DayJsUtils}>
            <Grid item xs={4}>
              <DateTimePicker
                id="startDatetime"
                label="Starting at"
                value={startDatetime}
                onChange={setStartDatetime}
                disablePast
                minutesStep={5}
                invalidLabel="Sorry, this is not a valid date"
                margin="normal"
              />
            </Grid>

            <Grid item xs={2} />

            <Grid item xs={6}>
              <DateTimePicker
                id="endDatetime"
                label="Ending at"
                value={endDatetime}
                onChange={setEndDatetime}
                disablePast
                minutesStep={5}
                minDate={startDatetime}
                minDateMessage="Can't end an event before it starts"
                margin="normal"
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onSubmit}>
          {`${props.event ? "Update" : "Create"} Event`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventModal;
