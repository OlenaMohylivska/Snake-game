import React, { useEffect } from 'react';
import { fetchUser } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { HomeStepper } from '../../components/HomeStepper';
import axios from 'axios';

export const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios('/helloworld')
      .then((res) => console.log(res.data));
  }, []);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <HomeStepper />
    </>
  );
};
