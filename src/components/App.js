import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import moment from 'moment'

import './app.css'
import Timer from './Timer'
import TimerButton from './TimerButton'
import TimerInput from './TimerInput'
import TimerTable from './TimerTable'
import TaskPageData from './TaskPageData'

const basePath = (process.env.NODE_ENV !== 'production') ? '' : '/timer/build'
const dev = process.env.NODE_ENV !== 'production'

class App extends Component {
  timer = null

  state = {
    currTime: null,
    currTaskName: '',
    currTimeStart: 0,
    tasks: [],
    start: 0
  }

  async componentDidMount() {
    await this.loadData()

    if (this.state.start) {
      this.timer = setInterval(this.updateTimer, 1000)
    }
  }

  loadData = async () => {
    if (!dev) {
      const res = await fetch('http://jiks.ru/timer/server.php?action=get', {
        method: 'GET'
      })

      const data = await res.json()
      this.setState(data)
    }
  }

  startTimer = async () => {
    if (this.state.currTaskName !== '') {
      const startDate = moment()
      const newData = {...this.state, start: 1, currTimeStart: startDate, currTime: startDate}

      this.timer = setInterval(this.updateTimer, 1000)

      await this.saveState(newData)
    }
  }

  updateTimer = () => {
    this.setState({currTime: moment()})
  }

  stopTimer = async () => {
    const {currTaskName, currTimeStart, tasks, currTime} = this.state

    const newData = {
      ...this.state,
      start: 0,
      currTime: null,
      currTaskName: '',
      tasks: [...tasks, {
        taskName: currTaskName,
        timeStart: currTimeStart,
        timeEnd: currTime
      }]
    }

    clearInterval(this.timer)
    await this.saveState(newData)
  }

  saveState = async (data) => {
    this.setState(data)

    if (!dev) {
      await fetch('http://jiks.ru/timer/server.php?action=save', {
        method: 'POST',
        body: JSON.stringify(data)
      })
    }
  }

  updateTaskName = (e) => {
    this.setState({currTaskName: e.currentTarget.value})
  }

  renderFirstPage = () => {
    const {start, currTaskName, tasks, currTimeStart, currTime} = this.state

    return <div>
      <Timer currTime={currTime} currTimeStart={currTimeStart} start={start}/>
      <TimerButton start={start} onStart={this.startTimer} onStop={this.stopTimer}/>
      <TimerInput start={start} onChangeName={this.updateTaskName} currTaskName={currTaskName}/>
      <TimerTable tasks={tasks} basePath={basePath}/>
    </div>
  }

  renderTaskPage = ({match}) => {
    const taskId = match.params.id
    const task = this.state.tasks[taskId]

    if (!task) return <div>Not found</div>
    return <TaskPageData task={task} taskId={taskId}/>
  }

  render() {
    return <div className="app">
      <Router>
        <Link to={`${basePath}/`}>Main Page</Link>
        <hr/>
        <Route path={`${basePath}/`} exact component={this.renderFirstPage}/>
        <Route path={`${basePath}/:id`} component={this.renderTaskPage}/>
      </Router>
    </div>
  }
}

export default App