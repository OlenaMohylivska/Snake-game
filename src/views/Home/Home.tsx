import React from 'react';
import { GameField } from '../../components/GameField';
import { GameFieldSize } from '../../components/GameFieldSize';

export const Home: React.FC = () => {
  return (
    <>
      <GameFieldSize />
      <GameField isLayout={true} />
    </>
  )
}
