import React, { useEffect } from 'react';
import { fetchUser } from '../../store/asyncActions';
import { useDispatch } from 'react-redux';
import { HomeStepper } from '../../components/HomeStepper';


export const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch])

  return (
    <>
    <HomeStepper />
    </>
  )
}
