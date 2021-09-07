import React from 'react';
import { GameField } from './components/GameField/GameField';
import { GameFieldSize } from './components/GameFieldSize/GameFieldSize';
import './App.css'


export const App: React.FC = () => {
  return (
    <>
      <GameFieldSize />
      <GameField />
    </>
  );
}
