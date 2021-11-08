import React, { useEffect } from 'react';
import { getAllUsersFromDB } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { HomeStepper } from '../../components/HomeStepper';
import { IState } from '../../store/rootReducer';
import { SnackbarError } from './../../components/SnackbarError';

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: IState) => state.error);

  useEffect(() => {
    dispatch(getAllUsersFromDB());
  }, []);

  return (
    <>
      <HomeStepper />
      {error ? <SnackbarError error={error} message={'Cannot fetch users. '} /> : null}
    </>
  );
};
