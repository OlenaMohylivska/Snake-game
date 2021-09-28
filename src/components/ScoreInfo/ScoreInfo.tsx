import React, { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from './../../store/rootReducer';
import { setTimerInfo } from './../../store/actions';
import './ScoreInfo.scss';

export const ScoreInfo: React.FC = () => {
  const dispatch = useDispatch();
  const snakePosition = useSelector((state: IState) => state.position);
  const userName = useSelector((state: IState) => state.userName);
  const { seconds, minutes } = useStopwatch({ autoStart: true });

  useEffect(() => {
    return () => {
      dispatch(setTimerInfo(`${minutes}:${seconds}`));
    };
  });

  return (
    <div className='score-info-wrapper'>
      {userName.error ? (
        <span className='data-container error'>Error: {userName.error}</span>
      ) : null}
      <span className='data-container player'>
        Player name: <span className='data'>{userName.name}</span>
      </span>
      <span className='data-container score'>
        Score: <span className='data'>{snakePosition.length - 1}</span>
      </span>
      <span className='data-container time'>
        <span>Time:</span>
        <span className='data'>
          {minutes}:{seconds}
        </span>
      </span>
    </div>
  );
};
