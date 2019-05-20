import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import './app.css'

import config from '../config'
import TaskPage from './pages/TaskPage'
import FirstPage from './pages/FirstPage'

const Secret = () => {
  return <div>123</div>
}

class App extends Component {
  render() {
    return <div className="app">
      <Router>
        <Link to={`${config.basePath}/`}>Main Page</Link>
        <hr/>
        <Route path={`${config.basePath}/`} exact component={FirstPage}/>
        <Route path={`${config.basePath}/:id`} component={TaskPage}/>
        <Route path={`${config.basePath}/secret`} component={Secret}/>
      </Router>
    </div>
  }
}

export default App