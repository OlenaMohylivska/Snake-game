import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'react-interval-hook';
import { setDirection } from './../../store/actions';
import { IState } from './../../store/rootReducer';
import clsx from 'clsx';
import './GameField.scss'

interface Props {
  isLayout: boolean
}

export const GameField: React.FC<Props> = ({ isLayout }) => {
	const snakePosition = useSelector((state: IState) => state.position);
	const fieldSize = useSelector((state: IState) => state.size);
	const movingDirection = useSelector((state: IState) => state.direction);
	const dispatch = useDispatch();

	const fieldCells = useMemo(() => {
		const result = [];
		const numberOfCells = fieldSize.columns * fieldSize.rows;
		for (let i = 1; i <= numberOfCells; i++) {
			result.push(i)
		}
		return result;
	}, [fieldSize])

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
    }, 400, 
		{
			autoStart: !isLayout,
		}
		);

	return (
		<div className="game-board-wrapper">
			<div
				className='game-board'
				style={{
					gridTemplateColumns: `repeat(${fieldSize.columns}, 40px)`,
					gridTemplateRows: `repeat(${fieldSize.rows}, 40px)`
				}}
			>
				{fieldCells.map(fieldCell => {
					let isCellSnakeBody = false;
					if (snakePosition.find(snakeCell => snakeCell === fieldCell)) {
						isCellSnakeBody = true
					}
					return <div
						className={clsx('field', fieldCell % 2 === 0 ? 'even' : 'odd', !isLayout && isCellSnakeBody && 'snake-body')}
						key={fieldCell}>
						{fieldCell}
					</div>
				})}
			</div>
		</div>
	)
}
