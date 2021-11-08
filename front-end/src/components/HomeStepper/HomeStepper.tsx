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
  useWindowDimensions,
  useMobileQuery,
  useTabletQuery,
  useDesktopQuery,
} from '../../utils';
import './HomeStepper.scss';
import { SnackbarError } from '../SnackbarError';

const defaultTabletCells = 25;

export const HomeStepper: React.FC = () => {
  const userName = useSelector((state: IState) => state.userName);
  const usersList = useSelector((state: IState) => state.usersList);
  const error = useSelector((state: IState) => state.error);
  const isMobileScreen = useMobileQuery();
  const isTabletScreen = useTabletQuery();
  const isDesktopScreen = useDesktopQuery();
  const dispatch = useDispatch();
  const fieldSize = useSelector((state: IState) => state.size);
  const { height, width } = useWindowDimensions();
  const maxBoardHeight = height! - 140;

  const calculateNumberOfRows = useCallback(
    (columns: number): number => {
      if (isDesktopScreen) {
        return fieldSize.rows;
      }
      const sellWidth = width! / columns;
      return Math.floor(maxBoardHeight / sellWidth);
    },
    [isMobileScreen, isTabletScreen, height]
  );

  useEffect(() => {
    if (isMobileScreen) {
      dispatch(changeNumberOfRows(calculateNumberOfRows(fieldSize.columns)));
    } else if (isTabletScreen) {
      dispatch(changeNumberOfColumns(defaultTabletCells));
      dispatch(changeNumberOfRows(calculateNumberOfRows(defaultTabletCells)));
    }
  }, [isMobileScreen, isTabletScreen, height]);

  useEffect(() => {
    dispatch(changeNumberOfRows(calculateNumberOfRows(fieldSize.columns)));
  }, [height]);

  const steps = [
    { component: <SwitchUserName dispatch={dispatch} usersList={usersList} error={error} /> },
    {
      component: [
        <GameFieldSize
          dispatch={dispatch}
          fieldSize={{ rows: fieldSize.rows, columns: fieldSize.columns }}
          key='GameFieldSize'
        />,
        <Board key='Board' snake={false} />,
        error ? <SnackbarError error={error} message={'Cannot save user name. '} /> : null
      ],
    },
    {
      component: <StartGame userName={userName} />,
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
