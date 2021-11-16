import React, { useCallback } from 'react';
import { GameField } from '../../components/GameField';
import { ScoreInfo } from '../../components/ScoreInfo';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from './../../store/rootReducer';
import {
  setTimerInfo,
} from './../../store/actions';
import { GameButtons } from '../../components/GameButtons/GameButtons';
import { useDesktopQuery } from '../../utils';
import './Game.scss';

export const Game: React.FC = () => {
  const dispatch = useDispatch();
  const snakePosition = useSelector((state: IState) => state.position);
  const userInfo = useSelector((state: IState) => state.userInfo);
  const error = useSelector((state: IState) => state.error);
  const isDesktopScreen = useDesktopQuery();
  const setTimer = useCallback((minutes: number, seconds: number) => {
    dispatch(setTimerInfo(`${minutes}:${seconds}`));
  }, []);

  return (
    <div className='game-wrapper'>
      <div>
        <ScoreInfo
          snakePosition={snakePosition}
          userInfo={userInfo}
          error={error}
          onUnmount={setTimer}
        />
        <GameField />
      </div>
      {!isDesktopScreen ? <GameButtons dispatch={dispatch} /> : null}
    </div>
  );
};
