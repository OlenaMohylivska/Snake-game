import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'react-interval-hook';
import { useHistory } from 'react-router-dom';
import {
  setDirection,
  setFruitPosition,
  setSnakePosition,
  setUserBestScore,
  updateUserScore,
} from '../../store/actions';
import { IState } from './../../store/rootReducer';
import { Board } from './../Board';
import { ROUTES } from './../../routes';
import { hasDuplicates, splitFullName } from '../../utils';
import { MovingDirectionActions } from '../../store/types';

interface IArguments {
  snakePosition: number[];
  fieldSize: { columns: number; rows: number };
}

const moveValidators: {
  [key in MovingDirectionActions]: (options: IArguments) => boolean;
} = {
  [MovingDirectionActions.TOP]: ({ snakePosition, fieldSize }) =>
    snakePosition[snakePosition.length - 1] < fieldSize.columns,
  [MovingDirectionActions.BOTTOM]: ({ snakePosition, fieldSize }) =>
    snakePosition[snakePosition.length - 1] >
    fieldSize.columns * fieldSize.rows - fieldSize.columns,
  [MovingDirectionActions.LEFT]: ({ snakePosition, fieldSize }) =>
    (snakePosition[snakePosition.length - 1] - 1) % fieldSize.columns === 0,
  [MovingDirectionActions.RIGHT]: ({ snakePosition, fieldSize }) =>
    snakePosition[snakePosition.length - 1] % fieldSize.columns === 0,
};

const defineSnakePosition: {
  [key in MovingDirectionActions]: (options: IArguments) => number[];
} = {
  [MovingDirectionActions.TOP]: ({ snakePosition, fieldSize }) => [
    ...snakePosition,
    snakePosition[snakePosition.length - 1] - fieldSize.columns,
  ],
  [MovingDirectionActions.BOTTOM]: ({ snakePosition, fieldSize }) => [
    ...snakePosition,
    snakePosition[snakePosition.length - 1] + fieldSize.columns,
  ],
  [MovingDirectionActions.LEFT]: ({ snakePosition }) => [
    ...snakePosition,
    snakePosition[snakePosition.length - 1] - 1,
  ],
  [MovingDirectionActions.RIGHT]: ({ snakePosition }) => [
    ...snakePosition,
    snakePosition[snakePosition.length - 1] + 1,
  ],
};

export const GameField: React.FC = () => {
  const movingDirection = useSelector((state: IState) => state.direction);
  const fieldSize = useSelector((state: IState) => state.size);
  const snakePosition = useSelector((state: IState) => state.position);
  const fruitPosition = useSelector((state: IState) => state.fruitPosition);
  const bestScore = useSelector((state: IState) => state.bestScore);
  const userName = useSelector((state: IState) => state.userName.name);
  const dispatch = useDispatch();
  const history = useHistory();

  const onKeyDownListener = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          return dispatch(setDirection(MovingDirectionActions.TOP));
        case 'ArrowDown':
          return dispatch(setDirection(MovingDirectionActions.BOTTOM));
        case 'ArrowLeft':
          return dispatch(setDirection(MovingDirectionActions.LEFT));
        case 'ArrowRight':
          return dispatch(setDirection(MovingDirectionActions.RIGHT));
      }
    },
    [dispatch]
  );

  const randomFruit = () => {
    const numberOfCells = fieldSize.columns * fieldSize.rows;
    let randomFruitCell = Math.floor(Math.random() * (numberOfCells - 1) + 1);

    while (snakePosition.includes(randomFruitCell)) {
      if (numberOfCells > randomFruitCell + 1) {
        randomFruitCell += 1;
      } else {
        randomFruitCell -= 100;
      }
    }

    return randomFruitCell;
  };

  const setScoreToDB = () => {
    if (snakePosition.length - 1 > bestScore) {
      dispatch(setUserBestScore(snakePosition.length - 1));
      const { firstName, lastName } = splitFullName(userName);      
      dispatch(updateUserScore({
        first: firstName,
        last: lastName,
        score: snakePosition.length - 1,
      }));
    };
  };

  const interval = useInterval(() => {
    if (hasDuplicates(snakePosition)) {
      setScoreToDB();
      history.replace(ROUTES.RESULT);
      return;
    }

    if (moveValidators[movingDirection]({ snakePosition, fieldSize })) {
      setScoreToDB();
      history.replace(ROUTES.RESULT);
    } else {
      const positionCopy = defineSnakePosition[movingDirection]({
        snakePosition,
        fieldSize,
      });
      if (!positionCopy.find((el) => el === fruitPosition)) {
        positionCopy.shift();
      }

      dispatch(setSnakePosition(positionCopy));
    }
  }, 300);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDownListener);

    return () => {
      document.removeEventListener('keydown', onKeyDownListener);
      interval.stop();
    };
  }, []);

  useEffect(() => {
    dispatch(setFruitPosition(randomFruit()));
  }, [snakePosition.length]);

  return <Board snake />;
};
