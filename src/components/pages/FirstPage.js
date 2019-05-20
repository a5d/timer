import React, {Component} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Table} from 'antd'

import config from '../../config'
import 'antd/lib/table/style/index.css';

import Timer from '../Timer'
import TimerButton from '../TimerButton'
import TimerInput from '../TimerInput'
import TimerTablePages from '../TimerTablePages'

import {fetchTasks, updateTaskName, updateTaskCurrTime, updateTasks} from '../../actions'

class FirstPage extends Component {
  timer = null

  componentDidMount() {
    if (!this.props.state.loaded) this.props.fetchTasks()

    if (this.props.state.start) {
      this.timer = setInterval(this.updateTimer, 1000)
    }
  }

  startTimer = async () => {
    if (this.props.state.currTaskName !== '') {
      const startDate = moment()

      this.timer = setInterval(this.updateTimer, 1000)
      this.props.updateTasks({start: 1, currTimeStart: startDate, currTime: startDate})
    }
  }

  updateTimer = () => {
    this.props.updateTaskCurrTime(moment())
  }

  stopTimer = async () => {
    const {currTaskName, currTimeStart, tasks, currTime} = this.props.state

    clearInterval(this.timer)

    this.props.updateTasks({
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
    this.props.updateTaskName(e.currentTarget.value)
  }

  loadNextPage = async () => {
    if (!config.dev) {
      const res = await fetch(`${config.serverPath}?action=get_page&page=${this.props.state.currentPage++}`, {
        method: 'GET'
      })

      const {tasks, currentPage} = await res.json()
      this.props.updateTasks({tasks: [...this.props.state.tasks, ...tasks], currentPage: currentPage})
    }
  }

  render() {
    const {
      start, currTaskName, tasks,
      currTimeStart, currTime, countPages
    } = this.props.state

    const columns = [
      {
        title: 'TaskName',
        dataIndex: 'taskName',
        key: 'name',
        render: (text, record, key) => {
          return <Link to={`${config.basePath}/task/${key}`}>{text}</Link>
        },
      },
      {
        title: 'Start',
        dataIndex: 'timeStart',
        key: 'start',
        render: (text) => moment(text).format('HH:mm:ss'),
      },
      {
        title: 'Duration',
        key: 'dur',
        render: (text, record) => {
          return moment(moment(record.timeEnd) - moment(record.timeStart)).format('mm:ss')
        },
      },
      {
        title: 'End',
        dataIndex: 'timeEnd',
        key: 'end',
        render: (text) => moment(text).format('HH:mm:ss'),
      }
    ]

    return <div>
      <Timer currTime={currTime} currTimeStart={currTimeStart} start={start}/>
      <TimerButton start={start} onStart={this.startTimer} onStop={this.stopTimer}/>
      <TimerInput start={start} onChangeName={this.updateTaskName} currTaskName={currTaskName}/>
      <Table bordered columns={columns} dataSource={tasks} pagination={false}/>
      {countPages > 1 && <TimerTablePages onNextPage={this.loadNextPage}/>}
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.tasks,
  }
}

export default connect(mapStateToProps, {fetchTasks, updateTaskName, updateTaskCurrTime, updateTasks})(FirstPage)