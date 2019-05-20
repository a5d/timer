import {combineReducers} from 'redux'

const defState = {
  loaded: 0,
  currTime: null,
  currTaskName: '',
  currTimeStart: 0,
  tasks: [],
  start: 0,
  countPages: 1,
  currentPage: 1
}

const tasksReducer = (state = defState, action) => {
  if (action.type === 'FETCH_TASKS') {
    return {...state, ...action.payload, loaded: 1}
  } else if (action.type === 'UPDATE_TASK_NAME') {
    return {...state, currTaskName: action.payload}
  }  else if (action.type === 'UPDATE_TASK_CURR_TIME') {
    return {...state, currTime: action.payload}
  } else if (action.type === 'UPDATE_TASKS') {
    return {...state, ...action.payload}
  } else {
    return state
  }
}

export default combineReducers({
  tasks: tasksReducer
})