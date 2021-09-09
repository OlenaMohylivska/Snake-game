import React from 'react';
import './ScoreInfo.scss';
export const ScoreInfo: React.FC = () => {


  return (
    <div className='score-info-wrapper'>
      <h2 className='player'>Player name</h2>
      <h2 className='score'>Score</h2>
      <h2 className='time'>Time</h2>
    </div>
    
  )
}