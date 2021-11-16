import React, { useEffect } from 'react';
import { getAllUsers } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { HomeStepper } from '../../components/HomeStepper';
import { IState } from '../../store/rootReducer';

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: IState) => state.error);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <>
      <HomeStepper />
    </>
  );
};
