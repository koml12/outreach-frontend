import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const TextSentConfirmation = (props) => {
  const { open, onClose } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      message="Text sent to candidate!"
      action={
        <IconButton onClick={onClose}>
          <CloseIcon color="secondary" />
        </IconButton>
      }
    />
  );
};

export default TextSentConfirmation;
