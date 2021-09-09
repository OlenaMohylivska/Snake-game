import React from 'react';
import { Route } from 'react-router-dom';
import { Home } from '../views/Home';
import { Game } from '../views/Game';

export const AppRouter: React.FC = () => {
  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/playing">
        <Game />
      </Route>

      <Route exact path="/result">
        <Game />
      </Route>
    </>
  )

}