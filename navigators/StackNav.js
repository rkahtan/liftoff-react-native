import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import LoadingScreen from '../screens/LoadingScreen';
import Dashboard from '../screens/Dashboard';
import Exercises from '../screens/Exercises';
import SingleExercise from '../screens/SingleExercise';
import UpdateExercise from '../screens/UpdateExercise';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* ?how does it know which one to start with? */}
      <Stack.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'Loading'}
        component={LoadingScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name='Sign Up' component={SignUp} />
      <Stack.Screen name='Sign In' component={SignIn} />
      <Stack.Screen
        name='Dashboard'
        component={Dashboard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

//Tab navigation can take in either the screen as a component or a Stack as the component
//pass this into tab for exercises -> single exercise -> edit single exercise


const ExercisesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='All Exercises'
        component={Exercises}
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
    </Stack.Navigator>
  );
};

export { MainStackNavigator, ExercisesStackNavigator };
