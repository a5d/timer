import React from 'react'
import moment from 'moment'

const TaskPageData = ({task, taskId}) => {
  return <div>
    <h1>Task #{taskId}</h1>
    <p>Task name: {task.taskName}</p>
    <p>Start: {moment(task.timeStart).format('HH:mm:ss')}</p>
    <p>Duration: {moment(moment(task.timeEnd) - moment(task.timeStart)).format('mm:ss')}</p>
    <p>End: {moment(task.timeEnd).format('HH:mm:ss')}</p>
  </div>
}

export default TaskPageData