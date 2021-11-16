import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from '../views/Home';
import { Game } from '../views/Game';
import { Result } from './../views/Result/Result';
import { ROUTES } from './../routes';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../store/rootReducer';
import { Statistic } from '../views/Statistic';
import moment from 'moment';

export const AppRouter: React.FC = () => {
  const snakePosition = useSelector((state: IState) => state.position);
  const timerInfo = useSelector((state: IState) => state.timerInfo);
  const bestScore = useSelector((state: IState) => state.bestScore);
  const error = useSelector((state: IState) => state.error);
  const userInfo = useSelector((state: IState) => state.userInfo);
  const statistic = useSelector((state: IState) => state.statistic);
  const dispatch = useDispatch();
  const dateAndTime = moment().format('DD/MM/YYYY HH:mm:ss');

  
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
                snakePosition={snakePosition}
                bestScore={bestScore}
                error={error}
                userInfo={userInfo}
                dateAndTime={dateAndTime}
              />
            )}
          />
          <Route path={ROUTES.STATISTIC} component={() => (
            <Statistic 
              dispatch={dispatch}
              statistic={statistic}
              error={error}
            />
          )} />
          <Redirect to={ROUTES.HOME} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
