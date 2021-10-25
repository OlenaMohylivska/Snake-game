import React from 'react';
import { GameField } from '../../components/GameField';
import { ScoreInfo } from '../../components/ScoreInfo';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from './../../store/rootReducer';
import { setTimerInfo } from './../../store/actions';
import { GameButtons } from '../../components/GameButtons/GameButtons';
import { useDesktopQuery } from '../../utils';
import './Game.scss';

export const Game: React.FC = () => {
  const dispatch = useDispatch();
  const snakePosition = useSelector((state: IState) => state.position);
  const userName = useSelector((state: IState) => state.userName);
  const isDesktopScreen = useDesktopQuery();
  const setTimer = (minutes: number, seconds: number) =>
    dispatch(setTimerInfo(`${minutes}:${seconds}`));

  return (
    <div className='game-wrapper'>
      <div>
        <ScoreInfo
          snakePosition={snakePosition}
          userName={userName}
          onUnmount={setTimer}
        />
        <GameField />
      </div>
      {!isDesktopScreen ? <GameButtons dispatch={dispatch} /> : null}
    </div>
  );
};
