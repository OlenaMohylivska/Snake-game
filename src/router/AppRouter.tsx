import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from '../views/Home';
import { Game } from '../views/Game';
import { Result } from './../views/Result/Result';
import { ROUTES } from './../routes';

export const AppRouter: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.PLAY} component={Game} />
          <Route path={ROUTES.RESULT} component={Result} />
          <Redirect to={ROUTES.HOME} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
