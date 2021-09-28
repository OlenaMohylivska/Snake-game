import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IState } from './../../store/rootReducer';
import { ROUTES } from '../../routes';
import './StartGame.scss';

export const StartGame: React.FC = () => {
  const userName = useSelector((state: IState) => state.userName.name);
  const history = useHistory();

  const toStartGame = useCallback(() => {
    if (!localStorage.getItem(userName)) {
      localStorage.setItem(userName, '0');
    }
    history.push(ROUTES.PLAY);
  }, [userName, history]);

  return (
    <div className='start-game-wrapper'>
      <Button
        className='start-button'
        variant='contained'
        color='primary'
        size='large'
        onClick={toStartGame}
      >
        Start
      </Button>
    </div>
  );
};
