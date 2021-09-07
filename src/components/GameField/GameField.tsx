import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDirectionRight, setDirectionLeft, setDirectionBottom, setDirectionTop } from './../../store/actions';
import { IState } from './../../store/rootReducer';
import clsx from 'clsx';
import './GameField.css'

const GameField: React.FC = () => {
	const snakePosition = useSelector((state: IState) => state.position);
	const fieldSize = useSelector((state: IState) => state.size);
	const dispatch = useDispatch();

	const fieldCells = useMemo(() => {
		const result = [];
		const numberOfCells = fieldSize.columns * fieldSize.rows;
		for (let i = 1; i <= numberOfCells; i++) {
			result.push(i)
		}
		return result;
	}, [fieldSize])

	// const onKeyDownListener = useCallback((event: KeyboardEvent) => {
		
	// 	switch (event.key) {
	// 		case 'ArrowUp':
	// 			return dispatch(moveTopAction());
	// 		case 'ArrowDown':
	// 			return dispatch(moveBottomAction());
	// 		case 'ArrowLeft':
	// 			return dispatch(moveLeftAction());
	// 		case 'ArrowRight':			
	// 			return dispatch(moveRightAction());
	// 	}
	// }, [dispatch]);

	const onKeyDownListener = useCallback((event: KeyboardEvent) => {
		
		switch (event.key) {
			case 'ArrowUp':
				return dispatch(setDirectionTop('TOP'));
			case 'ArrowDown':			
				return dispatch(setDirectionBottom('BOTTOM'));
			case 'ArrowLeft':
				return dispatch(setDirectionLeft('LEFT'));
			case 'ArrowRight':			
				return dispatch(setDirectionRight('RIGHT'));
		}
	}, [dispatch]);

	useEffect(() => {
		document.addEventListener('keydown', onKeyDownListener);

		return () => {
			document.removeEventListener('keydown', onKeyDownListener);
		}
	}, []);

	return (
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
					className={clsx('field', fieldCell % 2 === 0 ? 'even' : 'odd', isCellSnakeBody && 'snake-body')}
					key={fieldCell}>
					{fieldCell}
				</div>
			})}
		</div>
	)
}

export default GameField;
