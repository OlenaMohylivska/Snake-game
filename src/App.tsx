import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import './App.scss';

export const App: React.FC = () => {
  return (
    <>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
    </>
  );
}
