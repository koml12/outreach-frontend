import React, { Component } from "react";
import SignUpStepper from "./SignUpStepper";
import StepNavigation from "./StepNavigation";
import ResumeUpload from "../ResumeUpload";

class EventSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: ["Upload Resume", "Answer Questions"],
      activeStep: 0,
      completedSteps: []
    };

    this.setActiveStep = this.setActiveStep.bind(this);
    this.setStepComplete = this.setStepComplete.bind(this);
    this.onStepIncrement = this.onStepIncrement.bind(this);
    this.onStepDecrement = this.onStepDecrement.bind(this);
    this.renderSignUpStep = this.renderSignUpStep.bind(this);
  }

  setActiveStep(step) {
    this.setState({ activeStep: step });
  }

  setStepComplete(step) {
    if (!this.state.completedSteps.includes(step)) {
      const completedSteps = [...this.state.completedSteps, step];
      this.setState({ completedSteps });
    }
  }

  onStepIncrement() {
    let activeStep = this.state.activeStep + 1;
    this.setState({ activeStep });
  }

  onStepDecrement() {
    let activeStep = this.state.activeStep - 1;
    this.setState({ activeStep });
  }

  renderSignUpStep() {
    if (this.state.activeStep === 0) {
      return <ResumeUpload />;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <SignUpStepper
          steps={this.state.steps}
          completedSteps={this.state.completedSteps}
          activeStep={this.state.activeStep}
          onStepClicked={this.setActiveStep}
        />

        {this.renderSignUpStep()}

        <StepNavigation
          activeStep={this.state.activeStep}
          numberSteps={this.state.steps.length}
          numberCompleted={this.state.completedSteps.length}
          onNextClicked={this.onStepIncrement}
          onPreviousClicked={this.onStepDecrement}
        />
      </div>
    );
  }
}

export default EventSignUp;
