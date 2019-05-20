import React, {Component} from 'react'
import TaskPageData from '../TaskPageData'
import config from '../../config'

const dev = process.env.NODE_ENV !== 'production'

class TaskPage extends Component{
  state = {
    task: null
  }

  async componentDidMount() {
    await this.loadData()
  }

  loadData = async () => {
    if (!dev) {
      const res = await fetch(`${config.serverPath}?action=getTask&taskId=${this.props.match.params.id}`, {
        method: 'GET'
      })

      const data = await res.json()
      this.setState({task: data})
    }
  }

  render() {
    const {task} = this.state

    if (!task) return <div>Not found</div>
    return <TaskPageData taskId={this.props.match.params.id} task={task}/>
  }
}

export default TaskPage