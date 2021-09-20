import React, { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from './../../store/rootReducer';
import { setTimerInfo } from './../../store/actions';
import './ScoreInfo.scss';

export const ScoreInfo: React.FC = () => {
  const dispatch = useDispatch();
  const snakePosition = useSelector((state: IState) => state.position);
  const {seconds, minutes} = useStopwatch({ autoStart: true });

  useEffect(() => {

    return () => {
      dispatch(setTimerInfo(`${minutes}:${seconds}`))
    }
  })

  return (
    <div className='score-info-wrapper'>
      <span className='player'>Player name: Ivan</span>
      <span className='score'>Score: <span>{snakePosition.length - 1}</span></span>
      <span className='time'>Time: {minutes}:{seconds}</span>
    </div>
  )
}