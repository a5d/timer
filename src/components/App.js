import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import moment from 'moment'

import './app.css'
import Timer from './Timer'
import TimerButton from './TimerButton'
import TimerInput from './TimerInput'
import TimerTable from './TimerTable'
import TaskPageData from './TaskPageData'
import TimerTablePages from './TimerTablePages'

import config from '../config'

const dev = process.env.NODE_ENV !== 'production'

class App extends Component {
  timer = null

  state = {
    currTime: null,
    currTaskName: '',
    currTimeStart: 0,
    tasks: [],
    start: 0,
    countPages: 1,
    currentPage: 1
  }

  async componentDidMount() {
    await this.loadData()

    if (this.state.start) {
      this.timer = setInterval(this.updateTimer, 1000)
    }
  }

  loadData = async () => {
    if (!dev) {
      const res = await fetch(`${config.serverPath}?action=get`, {
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
      await fetch(`${config.serverPath}?action=save`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    }
  }

  updateTaskName = (e) => {
    this.setState({currTaskName: e.currentTarget.value})
  }

  loadNextPage = async () => {
    if (!dev) {
      const res = await fetch(`${config.serverPath}?action=get_page&page=${this.state.currentPage++}`, {
        method: 'GET'
      })

      const {tasks, currentPage} = await res.json()
      const newData = {tasks: [...this.state.tasks, ...tasks], currentPage: currentPage}

      this.setState(newData)
    }
  }

  renderFirstPage = () => {
    const {
      start, currTaskName, tasks,
      currTimeStart, currTime, countPages
    } = this.state

    return <div>
      <Timer currTime={currTime} currTimeStart={currTimeStart} start={start}/>
      <TimerButton start={start} onStart={this.startTimer} onStop={this.stopTimer}/>
      <TimerInput start={start} onChangeName={this.updateTaskName} currTaskName={currTaskName}/>
      <TimerTable tasks={tasks} basePath={config.basePath}/>
      {countPages > 1 && <TimerTablePages onNextPage={this.loadNextPage}/>}
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
        <Link to={`${config.basePath}/`}>Main Page</Link>
        <hr/>
        <Route path={`${config.basePath}/`} exact component={this.renderFirstPage}/>
        <Route path={`${config.basePath}/:id`} component={this.renderTaskPage}/>
      </Router>
    </div>
  }
}

export default App