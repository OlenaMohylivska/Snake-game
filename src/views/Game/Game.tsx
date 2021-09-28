import React from 'react';
import { GameField } from '../../components/GameField';
import { ScoreInfo } from '../../components/ScoreInfo';

export const Game: React.FC = () => {

  return (
    <div className='game-wrapper'>
      <ScoreInfo />
      <GameField />
    </div>
  )
}
