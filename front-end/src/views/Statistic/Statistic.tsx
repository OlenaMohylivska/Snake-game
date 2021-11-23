import React, { useEffect, useState } from 'react';
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
  const [dateSortOption, setDateSortOption] = useState('newest');
  const [timeSortOption, setTimeSortOption] = useState('');
  const [scoreSortOption, setScoreSortOption] = useState('');
  const [sortedStatistic, setSortedStatistic] = useState([...statistic]);

  const convertTime = (time: string) => {
    const timeArray = time.split(':');
    const sec = Number(timeArray[0]) * 60 + Number(timeArray[1]);
    return sec;
  };

  const sortDataIncludingScore = (
    data: Array<{ date: string; score: number; time: string }>,
    sign: string
  ) => {
    data.sort((a, b) => {
      if (a.score === b.score) {
        if (sign === 'less' ? a.date < b.date : a.date > b.date) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
    setSortedStatistic([...data]);
  };

  const sortDataIncludingTime = (
    data: Array<{ date: string; score: number; time: string }>,
    sign: string
  ) => {
    data.sort((a, b) => {
      if (convertTime(a.time) === convertTime(b.time)) {
        if (sign === 'less' ? a.date < b.date : a.date > b.date) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
    setSortedStatistic([...data]);
  };

  const sortDataByScoreIncludingTime = (
    data: Array<{ date: string; score: number; time: string }>,
    sign: string
  ) => {
    data.sort((a, b) => {
      if (a.score === b.score) {
        if (
          sign === 'less'
            ? convertTime(a.time) < convertTime(b.time)
            : convertTime(a.time) > convertTime(b.time)
        ) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
    setSortedStatistic([...data]);
  };

  const sortDataIncludingScoreAndTime = (
    data: Array<{ date: string; score: number; time: string }>,
    sign: string
  ) => {
    data.sort((a, b) => {
      if (a.score === b.score && convertTime(a.time) === convertTime(b.time)) {
        if (sign === 'less' ? a.date < b.date : a.date > b.date) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    });
    setSortedStatistic([...data]);
  };

  const sortConditionByDateAndScore = (
    data: Array<{ date: string; score: number; time: string }>
  ) => {
    if (dateSortOption === 'newest') {
      sortDataIncludingScore(data, 'less');
    } else {
      sortDataIncludingScore(data, 'more');
    }
  };

  const sortConditionByDateAndTime = (
    data: Array<{ date: string; score: number; time: string }>
  ) => {
    if (dateSortOption === 'newest') {
      sortDataIncludingTime(data, 'less');
    } else {
      sortDataIncludingTime(data, 'more');
    }
  };

  const sortConditionByDate = (
    data: Array<{ date: string; score: number; time: string }>
  ) => {
    if (dateSortOption === 'newest') {
      setSortedStatistic(data.sort((a, b) => (a.date < b.date ? 1 : -1)));
    } else {
      setSortedStatistic(data.sort((a, b) => (a.date > b.date ? 1 : -1)));
    }
  };

  const sortConditionByScoreAndTime = (
    data: Array<{ date: string; score: number; time: string }>
  ) => {
    if (dateSortOption === 'newest') {
      sortDataIncludingScoreAndTime(data, 'less');
    } else {
      sortDataIncludingScoreAndTime(data, 'more');
    }
  };

  const sortConditionWithoutTime = (
    data: Array<{ date: string; score: number; time: string }>
  ) => {
    if (scoreSortOption === 'biggest') {
      setSortedStatistic(data.sort((a, b) => (a.score > b.score ? 1 : -1)));
      sortConditionByDateAndScore(data);
    } else if (scoreSortOption === 'smallest') {
      setSortedStatistic(data.sort((a, b) => (a.score < b.score ? 1 : -1)));
      sortConditionByDateAndScore(data);
    } else {
      sortConditionByDate(data);
    }
  };

  // data
  useEffect(() => {
    const data = [...sortedStatistic];
    if (scoreSortOption !== '' && timeSortOption !== '') {
      dateSortOption === 'newest'
        ? sortDataIncludingScoreAndTime(data.reverse(), 'less')
        : sortDataIncludingScoreAndTime(data.reverse(), 'more');
    } else if (scoreSortOption !== '') {
      sortConditionByDateAndScore(data.reverse());
    } else if (timeSortOption !== '') {
      sortConditionByDateAndTime(data.reverse());
    } else {
      sortConditionByDate(data);
    }
  }, [dateSortOption]);

  // time
  useEffect(() => {
    const data = [...sortedStatistic];

    if (scoreSortOption === '') {
      if (timeSortOption === 'biggest') {
        setSortedStatistic(
          data.sort((a, b) =>
            convertTime(a.time) > convertTime(b.time) ? 1 : -1
          )
        );
        sortConditionByDateAndTime(data);
      } else if (timeSortOption === 'smallest') {
        setSortedStatistic(
          data.sort((a, b) =>
            convertTime(a.time) < convertTime(b.time) ? 1 : -1
          )
        );
        sortConditionByDateAndTime(data);
      } else {
        sortConditionByDate(data);
      }
    } else {
      if (timeSortOption === 'biggest') {
        sortDataByScoreIncludingTime(data.reverse(), 'less');
      } else if (timeSortOption === 'smallest') {
        sortDataByScoreIncludingTime(data.reverse(), 'more');
      } else {
        sortConditionWithoutTime(data);
      }
    }
  }, [timeSortOption]);

  // score
  useEffect(() => {
    const data = [...sortedStatistic];

    if (timeSortOption === '') {
      sortConditionWithoutTime(data);
    } else if (timeSortOption !== '') {
      if (scoreSortOption === 'biggest') {
        setSortedStatistic(data.sort((a, b) => (a.score > b.score ? 1 : -1)));
        sortConditionByScoreAndTime(data);
      } else if (scoreSortOption === 'smallest') {
        setSortedStatistic(data.sort((a, b) => (a.score < b.score ? 1 : -1)));
        sortConditionByScoreAndTime(data);
      } else {
        if (timeSortOption === 'biggest') {
          setSortedStatistic(
            data.sort((a, b) =>
              convertTime(a.time) > convertTime(b.time) ? 1 : -1
            )
          );
          sortConditionByDateAndTime(data);
        } else if (timeSortOption === 'smallest') {
          setSortedStatistic(
            data.sort((a, b) =>
              convertTime(a.time) < convertTime(b.time) ? 1 : -1
            )
          );
          sortConditionByDateAndTime(data);
        } else {
          sortConditionByDate(data);
        }
      }
    }
  }, [scoreSortOption]);

  return (
    <div className='statistic-wrapper'>
      <table className='table'>
        <thead className='table-head'>
          <tr>
            <th>
              Date
              <span className='arrows-wrapper'>
                <span
                  className='sort-button'
                  onClick={() =>
                    setDateSortOption(
                      dateSortOption === 'oldest' ? 'newest' : 'oldest'
                    )
                  }
                >
                  <KeyboardArrowUp
                    classes={{ root: 'arrowUp' }}
                    className={
                      dateSortOption === 'newest' ? 'active' : undefined
                    }
                  />
                  <KeyboardArrowDown
                    classes={{ root: 'arrowDown' }}
                    className={
                      dateSortOption === 'oldest' ? 'active' : undefined
                    }
                  />
                </span>
              </span>
            </th>
            <th>
              Time
              <span className='arrows-wrapper'>
                <span
                  className='sort-button'
                  onClick={() =>
                    setTimeSortOption(
                      timeSortOption === ''
                        ? 'biggest'
                        : timeSortOption === 'biggest'
                        ? 'smallest'
                        : ''
                    )
                  }
                >
                  <KeyboardArrowUp
                    classes={{ root: 'arrowUp' }}
                    className={
                      timeSortOption === ''
                        ? undefined
                        : timeSortOption === 'biggest'
                        ? 'active'
                        : undefined
                    }
                  />
                  <KeyboardArrowDown
                    classes={{ root: 'arrowDown' }}
                    className={
                      timeSortOption === ''
                        ? undefined
                        : timeSortOption === 'smallest'
                        ? 'active'
                        : undefined
                    }
                  />
                </span>
              </span>
            </th>
            <th>
              Score
              <span className='arrows-wrapper'>
                <span
                  className='sort-button'
                  onClick={() =>
                    setScoreSortOption(
                      scoreSortOption === ''
                        ? 'biggest'
                        : scoreSortOption === 'biggest'
                        ? 'smallest'
                        : ''
                    )
                  }
                >
                  <KeyboardArrowUp
                    classes={{ root: 'arrowUp' }}
                    className={
                      scoreSortOption === ''
                        ? undefined
                        : scoreSortOption === 'biggest'
                        ? 'active'
                        : undefined
                    }
                  />
                  <KeyboardArrowDown
                    classes={{ root: 'arrowDown' }}
                    className={
                      scoreSortOption === ''
                        ? undefined
                        : scoreSortOption === 'smallest'
                        ? 'active'
                        : undefined
                    }
                  />
                </span>
              </span>
            </th>
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
