import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackNavigator, ExercisesStackNavigator } from "./StackNav";

import AddExercise from '../screens/AddExercise';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    
      <Tab.Navigator>
       
        <Tab.Screen name='Home' component={MainStackNavigator}   options={{ headerShown: false }}/>
        <Tab.Screen name='Exercises' component={ExercisesStackNavigator}   options={{ headerShown: false }}/>
        <Tab.Screen name='Add Exercise' component={AddExercise}   options={{ headerShown: false }}/>
       

      </Tab.Navigator>
    
  );
}

export default BottomTabNavigator;
