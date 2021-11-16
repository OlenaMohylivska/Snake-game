import React, { useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useMobileQuery } from '../../utils';
import './ScoreInfo.scss';

type Props = {
  snakePosition: number[];
  userInfo: { name: string };
  error: string | null;
  onUnmount: (minutes: number, seconds: number) => void;
};

export const ScoreInfo: React.FC<Props> = ({
  snakePosition,
  userInfo,
  error,
  onUnmount,
}) => {
  const { seconds, minutes } = useStopwatch({ autoStart: true });
  const isMobileScreen = useMobileQuery();

  useEffect(() => {
    return () => {
      onUnmount(minutes, seconds);
    };
  });

  return (
    <div className='score-info-wrapper'>
      {error && !isMobileScreen ? (
        <span className='data-container error'>Error: {error}</span>
      ) : null}
      {!isMobileScreen ? (
        <span className='data-container player'>
          Player name: <span className='data'>{userInfo.name}</span>
        </span>
      ) : null}

      <span className='data-container score'>
        <span>Score:</span>
        <span className='data'>{snakePosition.length - 1}</span>
      </span>
      <span className='data-container time'>
        <span>Time:</span>
        <span className='data'>
          {minutes}:{seconds}
        </span>
      </span>
    </div>
  );
};
