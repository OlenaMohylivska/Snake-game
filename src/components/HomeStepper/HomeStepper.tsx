import React, { useState, useCallback, useEffect } from 'react';
import { Box, MobileStepper, Button } from '@material-ui/core';
import { SwitchUserName } from './../SwitchUserName/SwitchUserName';
import { GameFieldSize } from './../GameFieldSize/GameFieldSize';
import { Board } from './../Board/Board';
import { StartGame } from './../StartGame/StartGame';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../store/rootReducer';
import { changeNumberOfColumns, changeNumberOfRows } from '../../store/actions';
import {
  useMobileQuery,
  useTabletQuery,
  screenWidth,
  maxBoardHeight,
} from '../../utils';
import './HomeStepper.scss';

const defaultTabletCells = 25;

export const HomeStepper: React.FC = () => {
  const userName = useSelector((state: IState) => state.userName.name);
  const isMobileScreen = useMobileQuery();
  const isTabletScreen = useTabletQuery();
  const dispatch = useDispatch();
  const fieldSize = useSelector((state: IState) => state.size);

  const calculateNumberOfRows = useCallback(
    (columns: number): number => {
      const sellWidth = screenWidth / columns;

      return Math.floor(maxBoardHeight / sellWidth);
    },
    [isMobileScreen, isTabletScreen]
  );

  useEffect(() => {
    if (isMobileScreen) {
      dispatch(changeNumberOfRows(calculateNumberOfRows(fieldSize.columns)));
    } else if (isTabletScreen) {
      dispatch(changeNumberOfColumns(defaultTabletCells));
      dispatch(changeNumberOfRows(calculateNumberOfRows(defaultTabletCells)));
    }
  }, [isMobileScreen, useTabletQuery]);

  const steps = [
    { component: <SwitchUserName dispatch={dispatch} /> },
    {
      component: [
        <GameFieldSize
          dispatch={dispatch}
          fieldSize={{ rows: fieldSize.rows, columns: fieldSize.columns }}
          key='GameFieldSize'
        />,
        <Board key='Board' snake={false} />,
      ],
    },
    {
      component: <StartGame userName={{ name: userName, error: '' }} />,
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = useCallback(() => {
    setActiveStep(activeStep + 1);
  }, [activeStep]);

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep]);

  return (
    <Box className='box'>
      <Box>{steps[activeStep].component}</Box>
      <MobileStepper
        className='stepper'
        variant='text'
        steps={maxSteps}
        position='static'
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
