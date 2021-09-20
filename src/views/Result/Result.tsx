import React from 'react';
import { useSelector } from 'react-redux';
import { IState } from './../../store/rootReducer';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import './Result.scss';

export const Result: React.FC = () => {
  const snakePosition = useSelector((state: IState) => state.position);
  const timerInfo = useSelector((state: IState) => state.timerInfo);
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
        <div className='time-container'>
          <span className='title'>You time is: </span>
          <span className='score-data'>{timerInfo}</span>
        </div>
      </div>
      <Button
        className='try-again-button'
        variant='contained'
        color='primary'
        size='large'
        onClick={() => history.push('./')}
      >
        To main menu
      </Button>
    </div>
  )
}