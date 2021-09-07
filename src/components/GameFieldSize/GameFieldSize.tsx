import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from './../../store/rootReducer';
import { changeNumberOfColumns, changeNumberOfRows } from '../../store/actions';
import './GameFieldSize.css';

export const GameFieldSize: React.FC = () => {
  const [isSizeError, setIsSizeError] = useState(false)
  const dispatch = useDispatch();
  const fieldSize = useSelector((state: IState) => state.size);
  const movingDirection = useSelector((state: IState) => state.direction);

  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    switch (event.target.id) {
      case 'columns-input':
        if (value > 25 || value < 10) {
          setIsSizeError(true);

          return;
        }
        setIsSizeError(false)

        return dispatch(changeNumberOfColumns(value));
      case 'rows-input':
        if (value > 15 || value < 10) {
          setIsSizeError(true);

          return;
        }
        setIsSizeError(false)

        return dispatch(changeNumberOfRows(value));
    }
  }

  // console.log(movingDirection);

  // const intervalId = setInterval(() => {

  //   console.log('gg');

  //   dispatch({ type: movingDirection });
  // }, 1000)
  
  // console.log(intervalId);

  // useEffect(() =>  {
  //   clearInterval(intervalId)
  // }, [intervalId])
  // useEffect(() => () => clearInterval(intervalId), []);


  const toStartGame = () => {

  }

  return (
    <form className='game-field-form' autoComplete='off'>
      <TextField
        type='number'
        id='columns-input'
        defaultValue={fieldSize.columns}
        label='Columns'
        margin='normal'
        variant='outlined'
        onChange={handleChangeSize}
        size='small'
        error={isSizeError}
        helperText={isSizeError && 'From 10 to 25'}
      />
      <TextField
        type='number'
        id='rows-input'
        defaultValue={fieldSize.rows}
        label='Rows'
        margin='normal'
        variant='outlined'
        onChange={handleChangeSize}
        size='small'
        error={isSizeError}
        helperText={isSizeError && 'From 10 to 15'}
      />
      <Button
        variant='contained'
        color='primary'
        size='small'
        onClick={toStartGame}>
        Start
      </Button>
    </form>
  )
}