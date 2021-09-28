import React, { useState, useCallback } from "react";
import { Box, MobileStepper, Button } from "@material-ui/core";
import { SwitchUserName } from "./../SwitchUserName/SwitchUserName";
import { GameFieldSize } from "./../GameFieldSize/GameFieldSize";
import { Board } from "./../Board/Board";
import { StartGame } from "./../StartGame/StartGame";
import "./HomeStepper.scss";

const steps = [
  { component: <SwitchUserName /> },
  { component: [<GameFieldSize key='GameFieldSize' />, <Board key='Board' snake={false} />] },
  { component: <StartGame /> },
];

export const HomeStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = useCallback(() => {
    setActiveStep(activeStep + 1);
  }, [activeStep]);

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep]);

  return (
    <Box className="box">
      <Box>{steps[activeStep].component}</Box>
      <MobileStepper
        className="stepper"
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
          </Button>
        }
        backButton={
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
        }
      />
    </Box>
  );
};
