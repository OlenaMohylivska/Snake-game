import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from '../views/Home';
import { Game } from '../views/Game';
import { Result } from './../views/Result/Result';
import { ROUTES } from './../routes';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../store/rootReducer';

export const AppRouter: React.FC = () => {
  const snakePosition = useSelector((state: IState) => state.position);
  const timerInfo = useSelector((state: IState) => state.timerInfo);
  const userName = useSelector((state: IState) => state.userName.name);
  const dispatch = useDispatch();

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.PLAY} component={Game} />
          <Route
            path={ROUTES.RESULT}
            component={() => (
              <Result
                dispatch={dispatch}
                timerInfo={timerInfo}
                userName={userName}
                snakePosition={snakePosition}
              />
            )}
          />
          <Redirect to={ROUTES.HOME} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
