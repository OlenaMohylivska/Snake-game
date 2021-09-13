import React from 'react';
import { GameFieldSize } from '../../components/GameFieldSize';
import { Board } from './../../components/Board/Board';

export const Home: React.FC = () => {
  return (
    <>
      <GameFieldSize />
      <Board snake={false} />
    </>
  )
}
