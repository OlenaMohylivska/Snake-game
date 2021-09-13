import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { IState } from './../../store/rootReducer';
import { Cell } from './../Cell';
import './Board.scss';

interface IProps {
  snake: boolean
}

export const Board: React.FC<IProps> = ({snake}) => {
  const snakePosition = useSelector((state: IState) => state.position);
  const fieldSize = useSelector((state: IState) => state.size);

  const FieldColor = useMemo(() => {
    const result = [];

    if (fieldSize.columns % 2 !== 0) {
      const allCells = fieldSize.columns * fieldSize.rows;
      for (let i = 1; i <= allCells; i++) {
        result.push(i % 2 === 0 ? 'lime' : 'green');
      }
    } else {
      for (let i = 1; i <= fieldSize.rows; i++) {
        for (let j = 1; j <= fieldSize.columns; j++) {
          if (i % 2 === 0) {
            result.push(j % 2 === 0 ? 'green' : 'lime');
          } else {
            result.push(j % 2 === 0 ? 'lime' : 'green');
          }
        }
      }
    }
    return result;
  }, [fieldSize])

  return (
    <div className='board-wrapper'>
      <div
        className='board'
        style={{
          gridTemplateColumns: `repeat(${fieldSize.columns}, 40px)`,
          gridTemplateRows: `repeat(${fieldSize.rows}, 40px)`
        }}
      >
        {
          FieldColor.map((color, index) => {
            if (snake && snakePosition.find(snakeCell => snakeCell === index + 1)) {
              color = 'black'
            }
          return <Cell key={index} color={color} /> })
        }
      </div>
    </div>
  )
}
