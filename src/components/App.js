import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import './app.css'

import config from '../config'
import TaskPage from './pages/TaskPage'
import FirstPage from './pages/FirstPage'

class App extends Component {
  render() {
    return <div className="app">
      <Router>
        <Link to={`${config.basePath}/`}>Main Page</Link>
        <hr/>
        <Route path={`${config.basePath}/`} exact component={FirstPage}/>
        <Route path={`${config.basePath}/:id`} component={TaskPage}/>
      </Router>
    </div>
  }
}

export default App