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
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import CloseIcon from "@material-ui/icons/Close";

import CandidateCheckList from "./CandidateCheckList";

const useStyles = makeStyles({
  closeButton: {
    position: "absolute",
    right: "8px",
    top: "8px",
  },
});

const AddGroupModal = (props) => {
  const classes = useStyles();
  const { open, onClose, onSubmit, evaluators, initialData } = props;

  let initialName = "";
  let initialEvaluator = null;
  let initialSelectedRegistrations = [];
  if (initialData) {
    initialName = initialData.name;
    initialEvaluator = initialData.evaluator;
    initialSelectedRegistrations = initialData.registrations;
  }

  const [name, setName] = useState(initialName);
  const [selectedEvaluator, setSelectedEvaluator] = useState(initialEvaluator);
  const [selectedRegistrations, setSelectedRegistrations] = useState(initialSelectedRegistrations);

  const registrations = [...props.registrations, ...selectedRegistrations];

  const onRegistrationSelected = (registration) => {
    let newRegistrations;
    if (selectedRegistrations.includes(registration)) {
      const foundIndex = selectedRegistrations.indexOf(registration);
      newRegistrations = [
        ...selectedRegistrations.slice(0, foundIndex),
        ...selectedRegistrations.slice(foundIndex + 1),
      ];
    } else {
      newRegistrations = [...selectedRegistrations, registration];
    }
    setSelectedRegistrations(newRegistrations);
  };

  const onGroupCreated = () => {
    const group = {
      id: initialData ? initialData.id : null,
      evaluator: selectedEvaluator,
      name: name,
    };
    onSubmit(group, selectedRegistrations);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Create A New Group
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <TextField id="name" label="Group Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <FormControl style={{ minWidth: "240px" }}>
              <InputLabel>Evaluator</InputLabel>
              <Select
                defaultValue={selectedEvaluator ? selectedEvaluator : ""}
                onChange={(e) => setSelectedEvaluator(e.target.value)}
              >
                {evaluators.map((evaluator) => (
                  <MenuItem value={evaluator.id}>
                    {evaluator["first_name"]} {evaluator["last_name"]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <CandidateCheckList
              registrations={registrations}
              selectedRegistrations={selectedRegistrations}
              onRegistrationSelected={onRegistrationSelected}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onGroupCreated}>
          {initialData ? "Update" : "Create"} Group
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddGroupModal;
