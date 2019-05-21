import React, {Component} from 'react'
import TaskPageData from '../TaskPageData'
import {connect} from 'react-redux'

import {fetchTasks} from '../../actions'

class TaskPage extends Component{
  componentDidMount() {
    this.props.fetchTasks()
  }

  render() {
    const {tasks} = this.props.state
    const task = tasks[this.props.match.params.id]

    if (!task) return <div>Not found</div>
    return <TaskPageData task={{...task, id: this.props.match.params.id}}/>
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.tasks,
  }
}

export default connect(mapStateToProps, {fetchTasks})(TaskPage)