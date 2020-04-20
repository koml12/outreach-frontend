import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  root: {
    marginTop: "5%",
    height: "100px",
  },
  divider: {
    marginBottom: "5%",
  },
  next: {
    float: "right",
  },
  previous: {
    float: "left",
  },
  finish: {
    float: "right",
  },
});

const StepNavigation = (props) => {
  const classes = useStyles();

  const shouldEnablePreviousButton = () => {
    return props.activeStep > 0;
  };

  const shouldEnableNextButton = () => {
    return props.activeStep < props.numberSteps - 1;
  };

  const shouldRenderFinishButton = () => {
    return props.numberCompleted === props.numberSteps;
  };

  return (
    <div className={classes.root}>
      <Divider className={classes.divider} />
      <Button
        variant="contained"
        disabled={!shouldEnablePreviousButton()}
        className={classes.previous}
        onClick={props.onPreviousClicked}
      >
        Previous
      </Button>

      {shouldRenderFinishButton() && (
        <Button variant="contained" color="primary" className={classes.finish} onClick={props.onFinishClicked}>
          Finish
        </Button>
      )}

      <Button
        variant="contained"
        disabled={!shouldEnableNextButton()}
        className={classes.next}
        onClick={props.onNextClicked}
      >
        Next
      </Button>
    </div>
  );
};

export default StepNavigation;
