import React from 'react'
import moment from 'moment'

const Timer = ({start, currTime, currTimeStart}) => {
  return <div className="timer">{!start ? '00:00' : moment(moment(currTime) - moment(currTimeStart)).format('mm:ss')}</div>
}

export default Timer