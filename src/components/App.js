import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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

  startTimer = async () => {
    if (this.state.currTaskName !== '') {
      const startDate = moment()
      this.setState({start: 1, currTimeStart: startDate, currTime: startDate})
      this.timer = setInterval(this.updateTimer, 1000)

      const res = await fetch("http://jiks.ru/timer/server.php?action=save", {
        method: "POST",
        body: JSON.stringify(this.state)
      })

      console.log(res)
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

  renderFirstPage = () => {
    const {start, currTaskName, tasks, currTimeStart, currTime} = this.state

    return <div>
      <div className="timer">{!start ? '00:00' : moment( currTime - currTimeStart).format('mm:ss')}</div>
      <div className="button">
        {(!start) ?
          <button onClick={this.startTimer}>Start</button>
          :
          <button onClick={this.stopTimer}>Stop</button>}
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
            <td><Link to={`/timer/build/${i}`}>{task.taskName}</Link></td>
            <td>{moment(task.timeStart).format('HH:mm:ss')}</td>
            <td>{moment(task.timeEnd - task.timeStart).format('mm:ss')}</td>
            <td>{moment(task.timeEnd).format('HH:mm:ss')}</td>
          </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  }

  renderTaskPage = ({match}) => {
    const taskId = match.params.id
    const task = this.state.tasks[taskId]

    if (!task) return <div>Not found</div>
    return <div>
      <h1>Task #{taskId}</h1>
      <p>Task name: </p>
      <p>Start: {moment(task.timeStart).format('HH:mm:ss')}</p>
      <p>Duration: {moment(task.timeEnd - task.timeStart).format('mm:ss')}</p>
      <p>End: {moment(task.timeEnd).format('HH:mm:ss')}</p>
    </div>
  }

  render() {
    return <div className="app">
      <Router>
        <Link to="/timer/build/">Main Page</Link><hr/>
      <Route path="/timer/build/" exact component={this.renderFirstPage} />
      <Route path="/timer/build/:id" component={this.renderTaskPage} />
    </Router>
    </div>
  }
}

export default App