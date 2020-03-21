import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

const SignUpStepper = props => {
  const handleStepClick = index => () => {
    props.onStepClicked(index);
  };

  const isStepComplete = index => () => {
    return props.completedSteps.includes(index);
  };

  return (
    <Stepper activeStep={props.activeStep} alternativeLabel nonLinear>
      {props.steps.map((step, index) => (
        <Step key={index} completed={isStepComplete(index)}>
          <StepButton onClick={handleStepClick(index)}>{step}</StepButton>
        </Step>
      ))}
    </Stepper>
  );
};

export default SignUpStepper;
