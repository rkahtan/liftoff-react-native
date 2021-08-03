import axios from 'axios'
// import history from '../history'
import { AsyncStorage } from 'react-native';

const TOKEN = 'token'

const SET_AUTH = 'SET_AUTH'

const setAuth = auth => ({type: SET_AUTH, auth})

export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    //sending to express route with token in header
    //express route's return value is the user
    return dispatch(setAuth(res.data))
  }
}

//what is method here?
export const authenticate = (username, password, formName) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${formName}`, {username, password})
    //returning the resuly of post route to auth/login or auth/signup
    window.localStorage.setItem(TOKEN, res.data.token)
    //setting token in local storage to that return value
    dispatch(me())
    //dispatch me function which checks token and dispatches setAuth with user data
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
    //if error, dispatch setAuth with error data
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  // history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
      //will be checked for truthiness later to confirm if logged in
    default:
      return state
  }
}