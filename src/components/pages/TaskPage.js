import React, {Component} from 'react'
import TaskPageData from '../TaskPageData'
import {connect} from 'react-redux'

import {fetchTasks} from '../../actions'

class TaskPage extends Component{
  componentDidMount() {
    if (!this.props.state.loaded) this.props.fetchTasks()
  }

  render() {
    const {tasks} = this.props.state
    const task = tasks[this.props.match.params.id]

    if (!task) return <div>Not found</div>
    return <TaskPageData taskId={this.props.match.params.id} task={task}/>
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.tasks,
  }
}

export default connect(mapStateToProps, {fetchTasks})(TaskPage)