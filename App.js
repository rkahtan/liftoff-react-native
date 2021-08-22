import React from 'react';

// import {
//   MainStackNavigator,
//   ExercisesStackNavigator,
// } from './navigators/StackNav';

import BottomTabNavigator from "./navigators/TabNav";

import { NavigationContainer } from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import * as firebase from 'firebase';
import apiKeys from './config/keys';

// import WelcomeScreen from './screens/WelcomeScreen';
// import SignUp from './screens/SignUp';
// import SignIn from './screens/SignIn';
// import LoadingScreen from './screens/LoadingScreen';
// import Dashboard from './screens/Dashboard';
// import Exercises from './screens/Exercises'
// import AddExercise from './screens/AddExercise';
// import SingleExercise from './screens/SingleExercise'
// import UpdateExercise from './screens/UpdateExercise'
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

//not createNativeStackNavigator? https://reactnavigation.org/docs/hello-react-navigation
// const Tab = createMaterialBottomTabNavigator();

export default function App() {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase');
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return (
    // <Provider store = { reduxStore }>
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen
          name={'Loading'}
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Home'
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Sign Up' component={SignUp} />
        <Stack.Screen name='Sign In' component={SignIn} />
        <Stack.Screen
          name='Dashboard'
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Exercises'
          component={Exercises}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AddExercise'
          component={AddExercise}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SingleExercise'
          component={SingleExercise}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='UpdateExercise'
          component={UpdateExercise}
          options={{ headerShown: false }}
        />
      </Stack.Navigator> */}
      <BottomTabNavigator />
    </NavigationContainer>

    // </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
