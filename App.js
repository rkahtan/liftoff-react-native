import React from 'react';

import BottomTabNavigator from "./navigators/TabNav";

import { NavigationContainer } from '@react-navigation/native';

import * as firebase from 'firebase';
import apiKeys from './config/keys';


export default function App() {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase');
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return (
   
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>

  );
}
