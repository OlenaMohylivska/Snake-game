import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'react-interval-hook';
import { useHistory } from 'react-router-dom';
import { setDirection, setFruitPosition } from './../../store/actions';
import { IState } from './../../store/rootReducer';
import { Board } from './../Board';

export const GameField: React.FC = () => {
	const movingDirection = useSelector((state: IState) => state.direction);
	const fieldSize = useSelector((state: IState) => state.size);
	const snakePosition = useSelector((state: IState) => state.position);
	const dispatch = useDispatch();
	const history = useHistory();

	const onKeyDownListener = useCallback((event: KeyboardEvent) => {
		switch (event.key) {
			case 'ArrowUp':
				return dispatch(setDirection('TOP'));
			case 'ArrowDown':
				return dispatch(setDirection('BOTTOM'));
			case 'ArrowLeft':
				return dispatch(setDirection('LEFT'));
			case 'ArrowRight':
				return dispatch(setDirection('RIGHT'));
		}
	}, [dispatch]);

	const randomFruit: () => number = () => {
		const numberOfCells = fieldSize.columns * fieldSize.rows;
		const randomFruitCell = Math.floor(Math.random() * numberOfCells);

		if (snakePosition.find(el => el === randomFruitCell)) {
			return randomFruit()
		} else {
			return randomFruitCell;
		}
	}

	const interval = useInterval(() => {
		if (new Set(snakePosition).size !== snakePosition.length) {
			history.push('./result');
			return;
		}

		switch (movingDirection) {
			case 'TOP':
				if (snakePosition[snakePosition.length - 1] < fieldSize.columns) {
					history.push('./result');
					return;
				}

				return dispatch({ type: movingDirection });
			case 'BOTTOM':
				if (snakePosition[snakePosition.length - 1] > (fieldSize.columns * fieldSize.rows) - fieldSize.columns) {
					history.push('./result');
					return;
				}

				return dispatch({ type: movingDirection });
			case 'LEFT':
				if ((snakePosition[snakePosition.length - 1] - 1) % fieldSize.columns === 0) {
					history.push('./result');
					return;
				}

				return dispatch({ type: movingDirection });
			case 'RIGHT':
				if (snakePosition[snakePosition.length - 1] % fieldSize.columns === 0) {
					history.push('./result');
					return;
				}

				return dispatch({ type: movingDirection });
		};
	}, 300);

	useEffect(() => {
		document.addEventListener('keydown', onKeyDownListener);

		return () => {
			document.removeEventListener('keydown', onKeyDownListener);
			interval.stop();
		}
	}, []);

	useEffect(() => {
		dispatch(setFruitPosition(randomFruit()))
	}, [snakePosition.length])


	return (
		<Board snake />
	)
}
