import React, { Component } from "react";
import SignUpStepper from "./SignUpStepper";
import StepNavigation from "./StepNavigation";
import ResumeUpload from "../ResumeUpload";
import { EventQuestionnaire } from "../Questionnaire";
import SignUpFinished from "./SignUpFinished";

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
    this.handleFinishClicked = this.handleFinishClicked.bind(this);
    this.renderSignUpStep = this.renderSignUpStep.bind(this);
  }

  setActiveStep(step) {
    this.setState({ activeStep: step });
  }

  setStepComplete(step) {
    if (!this.state.completedSteps.includes(step)) {
      const completedSteps = [...this.state.completedSteps, step];
      this.setState({ completedSteps }, () => {
        if (completedSteps.length === this.state.steps.length) {
          this.setState({ activeStep: this.state.steps.length });
        }
      });
    }
    if (this.state.completedSteps.length === this.state.steps.length) {
      this.setState({ activeStep: this.state.steps.length });
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

  handleFinishClicked() {
    this.setState({ activeStep: this.state.steps.length });
  }

  renderSignUpStep() {
    if (this.state.activeStep === 0) {
      return <ResumeUpload eventId={this.props.eventId} onComplete={() => this.setStepComplete(0)} />;
    } else if (this.state.activeStep === 1) {
      return <EventQuestionnaire eventId={this.props.eventId} onComplete={() => this.setStepComplete(1)} />;
    } else {
      return <SignUpFinished />;
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
          onFinishClicked={this.handleFinishClicked}
        />
      </div>
    );
  }
}

export default EventSignUp;
