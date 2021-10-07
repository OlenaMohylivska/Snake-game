import React, { useState, useCallback } from 'react';
import { TextField } from '@material-ui/core';
import { changeNumberOfColumns, changeNumberOfRows } from '../../store/actions';
import { AnyAction } from 'redux';
import { useTabletQuery, useMobileQuery } from '../../utils';
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
  const { innerWidth: width, innerHeight: height } = window;
  const maxBoardHeight = height - 120;
  const isTabletScreen = useTabletQuery();
  const isMobileScreen = useMobileQuery();

  const handleChangeColumns = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      const sellWidth = width / value;
      const conditionSizeForChecking =
        isTabletScreen || isMobileScreen
          ? maxBoardHeight < sellWidth * fieldSize.rows
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
      const sellWidth = width / fieldSize.columns;
      const conditionSizeForChecking =
        isTabletScreen || isMobileScreen
          ? maxBoardHeight / value < sellWidth || value < 2
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

  return (
    <form className='game-field-form' autoComplete='off'>
      <TextField
        type='number'
        id='columns-input'
        defaultValue={fieldSize.columns}
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
        defaultValue={fieldSize.rows}
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
