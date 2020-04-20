import React from "react";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const EditDeleteButtons = (props) => (
  <ButtonGroup fullWidth>
    <Button color="primary" startIcon={<EditIcon />} onClick={props.onEdit}>
      Edit
    </Button>
    <Button color="secondary" startIcon={<DeleteIcon />} onClick={props.onDelete}>
      Delete
    </Button>
  </ButtonGroup>
);

export default EditDeleteButtons;
