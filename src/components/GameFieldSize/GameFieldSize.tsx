import React, { useState, useCallback } from 'react';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from './../../store/rootReducer';
import { changeNumberOfColumns, changeNumberOfRows } from '../../store/actions';
import './GameFieldSize.scss';

export const GameFieldSize: React.FC = () => {
  const [isSizeError, setIsSizeError] = useState(false);
  const dispatch = useDispatch();
  const fieldSize = useSelector((state: IState) => state.size);

  const handleChangeColumns = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      if (value > 25 || value < 10) {
        setIsSizeError(true);

        return;
      }
      setIsSizeError(false);
      dispatch(changeNumberOfColumns(value));
    },
    [dispatch]
  );

  const handleChangeRows = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      if (value > 15 || value < 10) {
        setIsSizeError(true);

        return;
      }
      setIsSizeError(false);

      dispatch(changeNumberOfRows(value));
    },
    [dispatch]
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
        helperText={isSizeError && 'From 10 to 25'}
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
        helperText={isSizeError && 'From 10 to 15'}
      />
    </form>
  );
};
