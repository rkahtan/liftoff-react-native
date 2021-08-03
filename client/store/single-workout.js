import axios from 'axios'

const SET_WORKOUT = 'SET_WORKOUT'
//sets individual workout
const UPDATE_WORKOUT = 'UPDATE_WORKOUT'
const DELETE_SINGLE_WORKOUT = 'DELETE_SINGLE_WORKOUT'

const setWorkout = (workout) => ({
  type: SET_WORKOUT,
  workout
})

const updateWorkout = (workout) => ({
  type: UPDATE_WORKOUT,
  workout
})

const deleteSingleWorkout = () => ({
  type: DELETE_SINGLE_WORKOUT
})


export const fetchWorkout = (id, token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/workouts/${id}`, {
        headers: {
          authorization: token
        }})
      dispatch(setWorkout(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const updateWorkoutThunk = (id, workout, token) => {
  console.log(id, workout, token) //this is ok so what's breaking the single workout component?
  for (let key in workout) {
    if (workout[key] === '')
    delete workout[key]
  }
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/workouts/${id}`, workout, {
        headers: {
          authorization: token
        }});
      dispatch(updateWorkout(updated));
    } catch (e) {
      console.log(e);
    }
  };
}

//updates but single workout component doesn't re-render to show new exercise until you re-load page
export const associateExToWorkoutThunk = (method, workoutId, exerciseId, token) => {
  console.log(method, workoutId, exerciseId, token)
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/workouts/${workoutId}`, {
        method,
        exerciseId
      }, {
        headers: {
          authorization: token
        }});
      console.log(updated)
      dispatch(updateWorkout(updated));
    } catch (e) {
      console.log(e)
    }
  }
}

//nope rn
export const dissociateExToWorkoutThunk = (method, workoutId, exerciseId, token) => {
  console.log(method, workoutId, exerciseId, token) //ok
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/workouts/${workoutId}`, {
        method,
        exerciseId
      }, {
        headers: {
          authorization: token
        }});
      dispatch(updateWorkout(updated));
    } catch (e) {
      console.log(e)
    }
  }
}



export const deleteSingleWorkoutThunk = (id, history, token) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/workouts/${id}`, {
        headers: {
          authorization: token
        }});
      dispatch(deleteSingleWorkout())
      //history.push('/workouts') //doesn't work
    } catch (e) {
      console.log(e);
    }
  };
}


const initialState = {}

export default function singleWorkoutReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WORKOUT:
      return action.workout;
    case UPDATE_WORKOUT:
      return action.workout;
    case DELETE_SINGLE_WORKOUT:
      return initialState;
    default:
      return state;
  }
}