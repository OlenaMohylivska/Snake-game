import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes';
import './StartGame.scss';

type Props = {
  userName: { name: string; error: string };
};

export const StartGame: React.FC<Props> = ({ userName }) => {
  const history = useHistory();

  const toStartGame = useCallback(() => {
    if (!localStorage.getItem(userName.name)) {
      localStorage.setItem(userName.name, '0');
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
