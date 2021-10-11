import React from 'react';
import { Button } from '@material-ui/core';
import './GameButtons.scss';
import { AnyAction } from 'redux';
import { setDirection } from '../../store/actions';
import { MovingDirectionActions } from '../../store/types';

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
        size='small'
      >
        &#11165;
      </Button>
      <div className='middle-buttons'>
        <Button
          className='button-left'
          onClick={() => dispatch(setDirection(MovingDirectionActions.LEFT))}
          variant='contained'
          size='small'
        >
          &#11164;
        </Button>
        <Button
          className='button-right'
          onClick={() => dispatch(setDirection(MovingDirectionActions.RIGHT))}
          variant='contained'
          size='small'
        >
          &#11166;
        </Button>
      </div>
      <Button
        className='button-bottom'
        onClick={() => dispatch(setDirection(MovingDirectionActions.BOTTOM))}
        variant='contained'
        size='small'
      >
        &#11167;
      </Button>
    </div>
  );
};
