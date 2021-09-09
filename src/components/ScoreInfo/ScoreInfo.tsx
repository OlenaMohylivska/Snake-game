import React from 'react';
import './ScoreInfo.scss';
export const ScoreInfo: React.FC = () => {


  return (
    <div className='score-info-wrapper'>
      <span className='player'>Player name</span>
      <span className='score'>Score</span>
      <span className='time'>Time</span>
    </div>
    
  )
}