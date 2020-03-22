import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  next: {
    float: "right"
  },
  previous: {
    float: "left"
  },
  finish: {
    float: "right"
  }
});

const StepNavigation = props => {
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
    <div>
      <Button
        variant="contained"
        disabled={!shouldEnablePreviousButton()}
        className={classes.previous}
        onClick={props.onPreviousClicked}
      >
        Previous
      </Button>

      <Button
        variant="contained"
        disabled={!shouldEnableNextButton()}
        className={classes.next}
        onClick={props.onNextClicked}
      >
        Next
      </Button>

      {shouldRenderFinishButton() && (
        <Button variant="contained" color="primary" className={classes.finish} onClick={props.onFinishClicked}>
          Finish
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;
