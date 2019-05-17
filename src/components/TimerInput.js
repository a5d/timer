import React from 'react'

const TimerInput = ({start, currTaskName, onChangeName}) => {
  return <div className="input">
    <input
      disabled={start}
      onChange={onChangeName}
      value={currTaskName}
      placeholder="Enter name"
      type="text"
    />
  </div>
}

export default TimerInput