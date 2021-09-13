import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'react-interval-hook';
import { setDirection } from './../../store/actions';
import { IState } from './../../store/rootReducer';
import { Board } from './../Board';

export const GameField: React.FC = () => {
	const movingDirection = useSelector((state: IState) => state.direction);
	const dispatch = useDispatch();

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

	useEffect(() => {
		document.addEventListener('keydown', onKeyDownListener);

		return () => {
			document.removeEventListener('keydown', onKeyDownListener);
		}
	}, []);

	useInterval(() => {
      dispatch({ type: movingDirection });
    }, 400);

	return (
		<Board snake />
	)
}
