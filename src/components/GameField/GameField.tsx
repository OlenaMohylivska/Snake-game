import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveTop, moveBottom, moveLeft, moveRight } from './../../store/actions';
import './GameField.css'

const GameField = () => {
	const dispatch = useDispatch();
	const snakePosition = useSelector((state: {position: number[]}) => state.position);
	const fieldCells = useMemo(() => {
		const result = [];
		for (let i = 1; i < 226; i++) {
			result.push(i)
		}
		return result;
	}, [])

	useEffect(() => {
    window.addEventListener('keydown', (event) => {
			switch (event.key) {
				case 'ArrowUp' :
					return dispatch(moveTop());
				case 'ArrowDown' :
					return dispatch(moveBottom());
				case 'ArrowLeft' :
					return dispatch(moveLeft());
				case 'ArrowRight' :
					return dispatch(moveRight());
			}	
    })
  }, []);

	return (
		<div className="game-board">
			<div className="main-field">
				{fieldCells.map(fieldCell => {
					let classNameColor = "green field"
					if (fieldCell % 2 === 0) {
						classNameColor = "lime field"
					}
					if (snakePosition.find(snakeCell => snakeCell === fieldCell)) {
						classNameColor = "snake-body field"
					}
					return <div className={classNameColor} id={`${fieldCell}`} key={fieldCell}>{fieldCell}</div>
				})}
			</div>
		</div>
	)
}

export default GameField;