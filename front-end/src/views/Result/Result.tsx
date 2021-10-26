import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { resetState, resetGameProgress } from './../../store/actions';
import { ROUTES } from './../../routes';
import { AnyAction } from 'redux';
import './Result.scss';

type Props = {
  dispatch: (action: AnyAction) => void;
  userName: string;
  timerInfo: string;
  snakePosition: number[];
};

export const Result: React.FC<Props> = ({
  dispatch,
  userName,
  timerInfo,
  snakePosition,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (Number(localStorage.getItem(userName)) < snakePosition.length - 1) {
      localStorage.setItem(userName, `${snakePosition.length - 1}`);
    }
  }, []);

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
          <span className='score-data'>{localStorage.getItem(userName)}</span>
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
    </div>
  );
};
