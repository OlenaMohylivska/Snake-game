import React from 'react';
import { Button } from '@material-ui/core';
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@material-ui/icons';
import { AnyAction } from 'redux';
import { setDirection } from '../../store/actions';
import { MovingDirectionActions } from '../../store/types';
import './GameButtons.scss';

type Props = {
  dispatch: (action: AnyAction) => void;
};

export const GameButtons: React.FC<Props> = ({ dispatch }) => {
  return (
    <div className='game-buttons-wrapper'>
      <Button
        className='button-top'
        onClick={() => dispatch(setDirection(MovingDirectionActions.TOP))}
        variant='contained'
        classes={{ root: 'button' }}
      >
        <KeyboardArrowUp />
      </Button>
      <Button
        className='button-left'
        onClick={() => dispatch(setDirection(MovingDirectionActions.LEFT))}
        variant='contained'
        classes={{ root: 'button' }}
      >
        <KeyboardArrowLeft />
      </Button>
      <Button
        className='button-right'
        onClick={() => dispatch(setDirection(MovingDirectionActions.RIGHT))}
        variant='contained'
        classes={{ root: 'button' }}
      >
        <KeyboardArrowRight />
      </Button>
      <Button
        className='button-bottom'
        onClick={() => dispatch(setDirection(MovingDirectionActions.BOTTOM))}
        variant='contained'
        classes={{ root: 'button' }}
      >
        <KeyboardArrowDown />
      </Button>
    </div>
  );
};
