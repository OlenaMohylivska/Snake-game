import React, { useState, useCallback, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { changeNumberOfColumns, changeNumberOfRows } from '../../store/actions';
import { AnyAction } from 'redux';
import {
  useTabletQuery,
  useMobileQuery,
  useWindowDimensions,
  useDesktopQuery,
} from '../../utils';
import './GameFieldSize.scss';

type Props = {
  dispatch: (action: AnyAction) => void;
  fieldSize: {
    rows: number;
    columns: number;
  };
};

export const GameFieldSize: React.FC<Props> = ({ dispatch, fieldSize }) => {
  const [isSizeError, setIsSizeError] = useState(false);
  const isTabletScreen = useTabletQuery();
  const isMobileScreen = useMobileQuery();
  const isDesktopScreen = useDesktopQuery();
  const { height, width } = useWindowDimensions();
  const maxBoardHeight = height! - 140;

  const handleChangeColumns = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      const cellWidth = width! / value;
      const conditionSizeForChecking =
        isTabletScreen || isMobileScreen
          ? maxBoardHeight < cellWidth * fieldSize.rows
          : value > 25 || value < 10;

      if (conditionSizeForChecking) {
        setIsSizeError(true);

        return;
      }
      setIsSizeError(false);
      dispatch(changeNumberOfColumns(value));
    },
    [dispatch, fieldSize]
  );

  const handleChangeRows = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      const cellWidth = width! / fieldSize.columns;
      const conditionSizeForChecking =
        isTabletScreen || isMobileScreen
          ? maxBoardHeight / value < cellWidth || value < 2
          : value > 15 || value < 10;

      if (conditionSizeForChecking) {
        setIsSizeError(true);

        return;
      }
      setIsSizeError(false);
      dispatch(changeNumberOfRows(value));
    },
    [dispatch, fieldSize]
  );

  useEffect(() => {
    if (!isDesktopScreen) {
      dispatch(
        changeNumberOfRows(
          Math.floor(maxBoardHeight / (width! / fieldSize.columns))
        )
      );
    }
  }, [height, width]);

  return (
    <form className='game-field-form' autoComplete='off'>
      <TextField
        type='number'
        id='columns-input'
        value={fieldSize.columns}
        label='Columns'
        margin='normal'
        variant='outlined'
        onChange={handleChangeColumns}
        size='small'
        error={isSizeError}
        helperText={isSizeError && 'Wrong size'}
      />
      <TextField
        className='text-field-row'
        type='number'
        id='rows-input'
        value={fieldSize.rows}
        label='Rows'
        margin='normal'
        variant='outlined'
        onChange={handleChangeRows}
        size='small'
        error={isSizeError}
        helperText={isSizeError && 'Wrong size'}
      />
    </form>
  );
};
