import axios from 'axios'

const SET_EXERCISE = 'SET_EXERCISE'
//sets individual exercise in store
const UPDATE_EXERCISE = 'UPDATE_EXERCISE'
const DELETE_SINGLE_EXERCISE = 'DELETE_SINGLE_EXERCISE'


const setExercise = (exercise) => ({
  type: SET_EXERCISE,
  exercise
})

const updateExercise = (exercise) => ({
  type: UPDATE_EXERCISE,
  exercise
})

const deleteSingleExercise = () => ({
  type: DELETE_SINGLE_EXERCISE
})

export const fetchExercise = (id, token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/exercises/${id}`, {
        headers: {
          authorization: token
        }})
      dispatch(setExercise(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateExerciseThunk = (id, exercise, token) => {
  for (let key in exercise) {
    if (exercise[key] === '')
    delete exercise[key]
  }
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/exercises/${id}`, exercise,  {
        headers: {
          authorization: token
        }});
      dispatch(updateExercise(updated));
    } catch (e) {
      console.log(e);
    }
  };
}

export const deleteSingleExerciseThunk = (id, token, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/exercises/${id}`,  {
        headers: {
          authorization: token
        }});
      dispatch(deleteSingleExercise())
      history.push('/exercises')
    } catch (e) {
      console.log(e);
    }
  };
}


const initialState = {}

export default function singleExerciseReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EXERCISE:
      return action.exercise;
    case UPDATE_EXERCISE:
      return action.exercise;
    case DELETE_SINGLE_EXERCISE:
      return initialState;
    default:
      return state;
  }
}