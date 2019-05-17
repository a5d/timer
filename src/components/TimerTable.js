import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

const TimerTable = ({tasks, basePath}) => {
  return <div className="table">
    <table>
      <tbody>
      <tr>
        <td>Task name</td>
        <td>Start</td>
        <td>Duration</td>
        <td>End</td>
      </tr>
      {tasks.map((task, i) => <tr key={i}>
        <td><Link to={`${basePath}/${i}`}>{task.taskName}</Link></td>
        <td>{moment(task.timeStart).format('HH:mm:ss')}</td>
        <td>{moment(moment(task.timeEnd) - moment(task.timeStart)).format('mm:ss')}</td>
        <td>{moment(task.timeEnd).format('HH:mm:ss')}</td>
      </tr>)}
      </tbody>
    </table>
  </div>
}

export default TimerTable