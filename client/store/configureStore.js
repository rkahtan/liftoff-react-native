import { createStore, combineReducers, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
// import workouts from './workouts'
// import exercises from './exercises'
// import single_workout from './single-workout'
// import single_exercise from './single-exercise'

const reducer = combineReducers(
{ auth }
);

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const configureStore = () => {
return createStore(reducer, middleware);
}

export default configureStore;

//create store
//pass reducer to store