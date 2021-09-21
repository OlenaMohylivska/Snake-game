import React from 'react';
import { GameFieldSize } from '../../components/GameFieldSize';
import { Board } from './../../components/Board/Board';
import { useDispatch } from 'react-redux';
import { setUserName } from './../../store/actions';

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  localStorage.setItem('bestScore', '0');

  fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data =>
      dispatch(setUserName(`${data.results[0].name.first} ${data.results[0].name.last}`)));

  return (
    <>
      <GameFieldSize />
      <Board snake={false} />
    </>
  )
}
