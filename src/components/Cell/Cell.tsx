import React from 'react';
import clsx from 'clsx';
import './Cell.scss';

interface IProps {
  color: string
}
export const Cell: React.FC<IProps> = ({ color }) => {
  return (
    <div className={clsx('cell', color )}></div>
  )
}