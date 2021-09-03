import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeDirectionActions } from '../../store/types';
import { directionActionCreator } from './../../store/actions';
import './GameField.css'

const GameField = () => {
	const snakePosition = useSelector((state: {position: number[]}) => state.position);
	const dispatch = useDispatch();
	
	const fieldCells = useMemo(() => {
		const result = [];
		for (let i = 1; i < 226; i++) {
			result.push(i)
		}
		return result;
	}, [])

	const onKeyPressListener = useCallback((event: any) => {//or document?
		switch (event.key) {
			case 'ArrowUp' :
				return dispatch(directionActionCreator(ChangeDirectionActions.CHANGE_DIRECTION_TOP));
			case 'ArrowDown' :
				return dispatch(directionActionCreator(ChangeDirectionActions.CHANGE_DIRECTION_BOTTOM));
			case 'ArrowLeft' :
				return dispatch(directionActionCreator(ChangeDirectionActions.CHANGE_DIRECTION_LEFT));
			case 'ArrowRight' :
				return dispatch(directionActionCreator(ChangeDirectionActions.CHANGE_DIRECTION_RIGHT));
		}	
	}, []);

	useEffect(() => {
    window.addEventListener('keydown', onKeyPressListener);

		return () => {
			window.removeEventListener('keydown', onKeyPressListener);
		}
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