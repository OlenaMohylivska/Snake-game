import React from 'react';
import { GameField } from '../../components/GameField';
import { ScoreInfo } from '../../components/ScoreInfo';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from './../../store/rootReducer';
import { setTimerInfo } from './../../store/actions';

export const Game: React.FC = () => {
  const dispatch = useDispatch();
  const snakePosition = useSelector((state: IState) => state.position);
  const userName = useSelector((state: IState) => state.userName);

  const setTimer = (minutes: number, seconds: number) =>
    dispatch(setTimerInfo(`${minutes}:${seconds}`));

  return (
    <div className='game-wrapper'>
      <ScoreInfo
        snakePosition={snakePosition}
        userName={userName}
        onUnmount={setTimer}
      />
      <GameField />
    </div>
  );
};
