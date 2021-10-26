import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { IState } from './../../store/rootReducer';
import { Cell } from './../Cell';
import {
  useMobileQuery,
  useTabletQuery,
  useWindowDimensions,
} from '../../utils';
import './Board.scss';

interface IProps {
  snake: boolean;
}

export const Board: React.FC<IProps> = ({ snake }) => {
  const snakePosition = useSelector((state: IState) => state.position);
  const fruitPosition = useSelector((state: IState) => state.fruitPosition);
  const fieldSize = useSelector((state: IState) => state.size);
  const isMobileScreen = useMobileQuery();
  const isTabletScreen = useTabletQuery();
  const { height, width } = useWindowDimensions();
  const [isHeightChanged, setIsHeightChanged] = useState(false);
  const [isWidthChanged, setIsWidthChanged] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (!isFirstRender) {
      setIsWidthChanged(false);
      setIsHeightChanged(true);
    }
    setIsFirstRender(false);
  }, [height]);

  useEffect(() => {
    if (!isFirstRender) {
      setIsHeightChanged(false);
      setIsWidthChanged(true);
    }
    setIsFirstRender(false);
  }, [width]);

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
  }, [fieldSize]);

  const calculateCellHeight = useMemo(() => {
    const maxBoardHeight = height! - 160;
    const cellWidth = width! / fieldSize.columns;

    if (cellWidth > maxBoardHeight / fieldSize.rows) {
      return maxBoardHeight / fieldSize.rows;
    }

    return cellWidth;
  }, [height]);

  const calculateCellWidth = useMemo(() => {
    const maxBoardHeight = height! - 160;
    const cellWidth = width! / fieldSize.columns;

    if (cellWidth < maxBoardHeight / fieldSize.rows) {
      return cellWidth;
    } else if (maxBoardHeight / fieldSize.rows < cellWidth) {
      return maxBoardHeight / fieldSize.rows;
    }
  }, [width]);

  return (
    <div className='board-wrapper'>
      <div
        className='board'
        style={
          isHeightChanged && snake
            ? {
                gridTemplateColumns: `repeat(${fieldSize.columns}, ${calculateCellHeight}px)`,
                gridTemplateRows: `repeat(${fieldSize.rows}, ${calculateCellHeight}px)`,
              }
            : isWidthChanged && snake
            ? {
                gridTemplateColumns: `repeat(${fieldSize.columns}, ${calculateCellWidth}px)`,
                gridTemplateRows: `repeat(${fieldSize.rows}, ${calculateCellWidth}px)`,
              }
            : isMobileScreen || isTabletScreen
            ? {
                width: '100%',
                gridTemplateColumns: `repeat(${fieldSize.columns}, 1fr)`,
                gridTemplateRows: `repeat(${fieldSize.rows}, 1fr)`,
              }
            : {
                gridTemplateColumns: `repeat(${fieldSize.columns}, 40px)`,
                gridTemplateRows: `repeat(${fieldSize.rows}, 40px)`,
              }
        }
      >
        {FieldColor.map((color, index) => {
          if (
            snake &&
            snakePosition.find((snakeCell) => snakeCell === index + 1)
          ) {
            color = 'black';
          }
          if (snake && fruitPosition === index + 1) {
            color = 'red';
          }
          return <Cell key={index} color={color} />;
        })}
      </div>
    </div>
  );
};
