import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes';
import './StartGame.scss';

type Props = {
  userInfo: { name: string };
};

export const StartGame: React.FC<Props> = ({ userInfo }) => {
  const history = useHistory();

  const toStartGame = useCallback(() => {
    history.replace(ROUTES.PLAY);
  }, [userInfo, history]);

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
