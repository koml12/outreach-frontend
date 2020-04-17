import React from "react";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

const SaveCancelButtons = ({ onSave, onCancel }) => (
  <ButtonGroup fullWidth>
    <Button color="primary" startIcon={<SaveIcon />} onClick={onSave}>
      Save
    </Button>
    <Button color="secondary" startIcon={<CloseIcon />} onClick={onCancel}>
      Cancel
    </Button>
  </ButtonGroup>
);

export default SaveCancelButtons;
