import config from '../config'

export const fetchTasks = () => async (dispatch, getState) => {
  if (!config.dev && !getState().tasks.loaded) {
    const response = await fetch(`${config.serverPath}?action=get`, {
      method: 'GET'
    })

    const data = await response.json()

    dispatch({type: 'FETCH_TASKS', payload: data})
  }
}

export const updateTaskName = (name) => {
  return ({type: 'UPDATE_TASK_NAME', payload: name})
}

export const updateTaskCurrTime = (time) => {
  return ({type: 'UPDATE_TASK_CURR_TIME', payload: time})
}

export const updateTasks = (tasks) => async dispatch => {

  if (!config.dev) {
    await fetch(`${config.serverPath}?action=save`, {
      method: 'POST',
      body: JSON.stringify(tasks)
    })
  }

  dispatch({type: 'UPDATE_TASKS', payload: tasks})
}