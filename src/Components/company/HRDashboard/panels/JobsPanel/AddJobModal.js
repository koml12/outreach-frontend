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

import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  closeButton: {
    position: "absolute",
    right: "8px",
    top: "8px",
  },
});

const AddJobModal = (props) => {
  const classes = useStyles();

  let initialTitle = "";
  let initialDescription = "";

  if (props.job) {
    initialTitle = props.job["Job Title"];
    initialDescription = props.job["Description"];
  }

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const onSubmit = () => {
    const job = {
      id: props.job ? props.job.id : null,
      "Job Title": title,
      Description: description,
    };
    props.onSubmit(job);
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>
        {props.job ? "Edit Job" : "Create A New Job"}
        <IconButton className={classes.closeButton} onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              id="title"
              label="Job Title"
              fullWidth
              margin="dense"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="description"
              label="Description"
              fullWidth
              multiline
              rows={10}
              variant="outlined"
              margin="dense"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onSubmit}>
          {`${props.job ? "Update" : "Create"} Job`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddJobModal;
