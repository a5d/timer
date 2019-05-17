import React from 'react'

const TimerButton = ({start, onStart, onStop}) => {
  return <div className="button">
    {(!start) ?
      <button onClick={onStart}>Start</button>
      :
      <button onClick={onStop}>Stop</button>}
  </div>
}

export default TimerButton