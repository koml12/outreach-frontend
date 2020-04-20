import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  fab: {
    position: "absolute",
    bottom: "24px",
    right: "24px",
  },
});

const AddButton = (props) => {
  const classes = useStyles();

  return (
    <Fab className={classes.fab} onClick={props.onClick} color="primary">
      <AddIcon />
    </Fab>
  );
};

export default AddButton;
