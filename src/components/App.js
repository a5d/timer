import React, {Component} from 'react'
import moment from 'moment'

import './app.css'

class App extends Component {
  timer = null;

  state = {
    currTime: null,
    currTaskName: '',
    currTimeStart: 0,
    tasks: [],
    start: 0
  }

  startTimer = () => {
    if (this.state.currTaskName !== '') {
      const startDate = moment()
      this.setState({start: 1, currTimeStart: startDate, currTime: startDate})
      this.timer = setInterval(this.updateTimer, 1000)
    }
  }

  updateTimer = () => {
    this.setState({currTime: moment()})
  }

  stopTimer = () => {
    const {currTaskName, currTimeStart, tasks, currTime} = this.state

    clearInterval(this.timer)
    this.setState({
      start: 0,
      currTime: null,
      currTaskName: '',
      tasks: [...tasks, {
        taskName: currTaskName,
        timeStart: currTimeStart,
        timeEnd: currTime
      }]
    })

  }

  updateTaskName = (e) => {
    this.setState({currTaskName: e.currentTarget.value})
  }

  render() {
    const {start, currTaskName, tasks, currTimeStart, currTime} = this.state

    return <div className="app">
      <div className="timer">{!start ? '00:00' : moment( currTime - currTimeStart).format('mm:ss')}</div>
      <div className="button">
        {(!start) ?
          <button onClick={this.startTimer}>Старт</button>
          :
          <button onClick={this.stopTimer}>Стоп</button>}
      </div>
      <div className="input">
        <input
          disabled={start}
          onChange={this.updateTaskName}
          value={currTaskName}
          placeholder="Enter name"
          type="text"
        />
      </div>
      <div className="table">
        <table>
          <tbody>
          <tr>
            <td>Task name</td>
            <td>Start</td>
            <td>Duration</td>
            <td>End</td>
          </tr>
          {tasks.map((task, i) => <tr key={i}>
            <td>{task.taskName}</td>
            <td>{moment(task.timeStart).format('HH:mm:ss')}</td>
            <td>{moment(task.timeEnd - task.timeStart).format('mm:ss')}</td>
            <td>{moment(task.timeEnd).format('HH:mm:ss')}</td>
          </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  }
}

export default App