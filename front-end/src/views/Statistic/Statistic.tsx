import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { ROUTES } from './../../routes';
import { useHistory } from 'react-router-dom';
import { resetState } from './../../store/actions';
import { SnackbarError } from '../../components/SnackbarError';
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';
import './Statistic.scss';

type Props = {
  dispatch: (action: any) => void;
  statistic: Array<{ date: string; score: number; time: string }>;
  error: string | null;
};

export const Statistic: React.FC<Props> = ({ dispatch, statistic, error }) => {
  const history = useHistory();
  const [sortOption, setSortOption] = useState('default');
  const [sortedStatistic, setSortedStatistic] = useState([...statistic]);
  const [arrowUpColor, setArrowUpColor] = useState<'inherit' | 'primary'>(
    'inherit'
  );
  const [arrowDownColor, setArrowDownColor] = useState<'inherit' | 'primary'>(
    'inherit'
  );

  const clickHandler = () => {
    switch (sortOption) {
      case 'default':
        setSortedStatistic(sortedStatistic.reverse());
        setArrowUpColor('primary');
        setSortOption('newest');
        break;
      case 'newest':
        setSortedStatistic(sortedStatistic.reverse());
        setArrowUpColor('inherit');
        setArrowDownColor('primary');
        setSortOption('oldest');
        break;
      case 'oldest':
        setArrowUpColor('inherit');
        setArrowDownColor('inherit');
        setSortOption('default');
        break;
    }
  };

  return (
    <div className='statistic-wrapper'>
      <table className='table'>
        <thead className='table-head'>
          <tr>
            <th>
              Date
              <span className='sort-button' onClick={clickHandler}>
                <KeyboardArrowUp
                  classes={{ root: 'arrowUp' }}
                  color={arrowUpColor}
                />
                <KeyboardArrowDown
                  classes={{ root: 'arrowDown' }}
                  color={arrowDownColor}
                />
              </span>
            </th>
            <th>Time</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedStatistic.map((el: any, index: number) => {
            return (
              <tr key={index}>
                <td>{el.date}</td>
                <td>{el.time}</td>
                <td>{el.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
        className='button button-home'
        variant='contained'
        color='primary'
        size='large'
        onClick={() => {
          dispatch(resetState());
          history.replace(ROUTES.HOME);
        }}
      >
        To main menu
      </Button>
      {error ? (
        <SnackbarError error={error} message={'Cannot fetch statistic. '} />
      ) : null}
    </div>
  );
};
