import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  closeButton: {
    position: "absolute",
    right: "8px",
    top: "8px",
  },
});

const DeleteJobModal = (props) => {
  const classes = useStyles();

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>
        Delete Event
        <IconButton className={classes.closeButton} onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent divider>
        <DialogContentText color="textPrimary">
          Are you sure you want to delete the event "{props.title}"?
        </DialogContentText>
        <DialogActions>
          <Button onClick={props.onDelete}>Yes</Button>
          <Button onClick={props.onClose}>No</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteJobModal;
