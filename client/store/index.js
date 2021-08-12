import { AppRegistry } from 'react-native';
import React from 'react';
import App from '../../App';
import { name as appName } from '../../app.json';
import { Provider } from 'react-redux';
import configureStore from './configureStore'

const store = configureStore()

const RNRedux = () => (
  <Provider store = { store }>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);



// import {createStore, combineReducers, applyMiddleware} from 'redux'
// import {createLogger} from 'redux-logger'
// import thunkMiddleware from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'
// import auth from './auth'
// // import workouts from './workouts'
// // import exercises from './exercises'
// // import single_workout from './single-workout'
// // import single_exercise from './single-exercise'

// const reducer = combineReducers({ 
//   auth,
//   // workouts,
//   // exercises,
//   // single_workout,
//   // single_exercise
// })
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )
// const store = createStore(reducer, middleware)

// export default store
// export * from './auth'
