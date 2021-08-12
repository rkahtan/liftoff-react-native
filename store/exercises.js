import axios from 'axios'

const SET_EXERCISES = 'SET_EXERCISES'
//get/fetch all exercises for a user
const ADD_EXERCISE = 'SET_EXERCISE'
//adds another exercise to the list of exercises for a user

const setExercises = (exercises) => ({
  type: SET_EXERCISES,
  exercises
})

const addExercise = (exercise) => ({
  type: ADD_EXERCISE,
  exercise
})

export const fetchExercises = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/exercises', {
        headers: {
          authorization: token
        }
      }) 
      dispatch(setExercises(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addExerciseThunk = (exercise, token) => {
  return async(dispatch) => {
    try {
      const { data: created } = await axios.post('/api/exercises', exercise, {
        headers: {
          authorization: token
        }
      })
      dispatch(addExercise(created))
    } catch (err) {
      console.log(err)
    }
  }
}
//assuming this returns just the new exercise

const initialState = []

export default function exercisesReducer(state=initialState, action) {
  switch (action.type) {
    case SET_EXERCISES:
      return action.exercises
    case ADD_EXERCISE:
      return [...state, action.exercise];
    default:
      return state
  }
}