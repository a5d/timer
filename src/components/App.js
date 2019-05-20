import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import './app.css'

import config from '../config'
import TaskPage from './pages/TaskPage'
import FirstPage from './pages/FirstPage'
import Login from './pages/Login'

class App extends Component {
  render() {
    return <div className="app">
      <Router>
          <p>
            <Link to={`${config.basePath}/`}>Main Page</Link>
            {' | '}
            <Link to={`${config.basePath}/login`}>Login</Link>
          </p>
          <hr/>
          <Route path={`${config.basePath}/`} exact component={FirstPage}/>
          <Route path={`${config.basePath}/task/:id`} component={TaskPage}/>
          <Route path={`${config.basePath}/login`} component={Login}/>
      </Router>
    </div>
  }
}

export default App