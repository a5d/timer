import React from 'react'
import './app.css'

const App = () => {
  return <div className="app">
    <div className="timer">00:00</div>
    <div className="button"><button>Старт</button></div>
    <div className="input"><input placeholder="Enter name" type="text"/></div>
    <div className="table">
      <table>
        <tr>
          <td>Task name</td>
          <td>Start</td>
          <td>Duration</td>
          <td>End</td>
        </tr>
      </table>
    </div>
  </div>
}

export default App