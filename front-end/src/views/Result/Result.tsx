import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { resetState, resetGameProgress } from './../../store/actions';
import { ROUTES } from './../../routes';
import { AnyAction } from 'redux';
import { SnackbarError } from '../../components/SnackbarError';
import './Result.scss';

type Props = {
  dispatch: (action: AnyAction) => void;
  timerInfo: string;
  snakePosition: number[];
  bestScore: number;
  error: string | null;
};

export const Result: React.FC<Props> = ({
  dispatch,
  timerInfo,
  snakePosition,
  bestScore,
  error,
}) => {
  const history = useHistory();

  return (
    <div className='result-page'>
      <div className='game-over-wrapper'>
        <span className='game-over-title'>Game Over</span>
      </div>
      <div className='result-wrapper'>
        <div className='score-container'>
          <span className='title'>You score is: </span>
          <span className='score-data'>{snakePosition.length - 1}</span>
        </div>
        <div className='best-score-container'>
          <span className='title'>Best score: </span>
          <span className='score-data'>{bestScore}</span>
        </div>
        <div className='time-container'>
          <span className='title'>You time is: </span>
          <span className='score-data'>{timerInfo}</span>
        </div>
      </div>
      <div className='buttons-wrapper'>
        <Button
          className='button'
          variant='contained'
          color='primary'
          size='large'
          onClick={() => {
            dispatch(resetState());
            history.replace(ROUTES.HOME);
          }}
        >
          To main menu
        </Button>
        <Button
          className='button'
          variant='contained'
          color='primary'
          size='large'
          onClick={() => {
            dispatch(resetGameProgress());
            history.replace(ROUTES.PLAY);
          }}
        >
          Try again
        </Button>
      </div>
      {error ? <SnackbarError error={error} message={'Cannot update score. '} /> : null}
    </div>
  );
};
