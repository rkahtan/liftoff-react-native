import axios from 'axios'


const SET_WORKOUTS = 'SET_WORKOUTS'
//get/fetch all workouts for a user
const ADD_WORKOUT = 'ADD_WORKOUT'
//adds another workout to the list of workouts for a user

const setWorkouts = (workouts) => ({
  type: SET_WORKOUTS,
  workouts
})

const addWorkout = (workout) => ({
  type: ADD_WORKOUT,
  workout
})

export const fetchWorkouts = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/workouts', {
        headers: {
          authorization: token
        }
      })
      dispatch(setWorkouts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addWorkoutThunk = (workout, token) => {
  return async(dispatch) => {
    try {
      const { data: created } = await axios.post('/api/workouts', workout, {
        headers: {
          authorization: token
        }
      })
      dispatch(addWorkout(created))
    } catch (err) {
      console.log(err)
    }
  }
}
//this should give the option to assign exercises to a workout

const initialState = []

export default function workoutsReducer(state=initialState, action) {
  switch (action.type) {
    case SET_WORKOUTS:
      return action.workouts
    case ADD_WORKOUT:
      return [...state, action.workout]
    default:
      return state
  }
}