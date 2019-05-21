import React, {Component, Suspense, lazy} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import './app.css'

import config from '../config'
const TaskPage = lazy(() => import('./pages/TaskPage'))
const FirstPage = lazy(() => import('./pages/FirstPage'))
const Login = lazy(() => import('./pages/Login'))

class App extends Component {
  render() {
    return <div className="app">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <p>
            <Link to={`${config.basePath}/`}>Main Page</Link>
            {' | '}
            <Link to={`${config.basePath}/login`}>Login</Link>
          </p>
          <hr/>
          <Route path={`${config.basePath}/`} exact component={FirstPage}/>
          <Route path={`${config.basePath}/task/:id`} component={TaskPage}/>
          <Route path={`${config.basePath}/login`} component={Login}/>
        </Suspense>
      </Router>
    </div>
  }
}

export default App