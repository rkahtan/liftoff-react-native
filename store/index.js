import { AppRegistry } from 'react-native';
import React from 'react';
// import App from '../App';
import { name as appName } from '../app.json';
import { Provider } from 'react-redux';

import configureStore from './configureStore'

const reduxStore = configureStore()

export default reduxStore
