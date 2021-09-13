import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from '../views/Home';
import { Game } from '../views/Game';

export const AppRouter: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/playing" component={Game} />
          <Route path="/result" />
        </Switch>
      </BrowserRouter>
    </>
  )
}
