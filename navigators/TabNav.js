import React from 'react';
// import { createBottomTabNavigator } from "react-navigation/bottom-tabs";
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createBottomTabNavigator } from "react-navigation-tabs";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStackNavigator, ExercisesStackNavigator } from "./StackNav";

import Exercises from '../screens/Exercises';
import AddExercise from '../screens/AddExercise';
import Dashboard from '../screens/Dashboard';



const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    
      <Tab.Navigator>
       
        <Tab.Screen name='Home' component={MainStackNavigator}   options={{ headerShown: false }}/>
        <Tab.Screen name='Exercises' component={ExercisesStackNavigator}   options={{ headerShown: false }}/>
        <Tab.Screen name='Add Exercise' component={AddExercise}   options={{ headerShown: false }}/>
        {/* <Tab.Screen name='Dashboard' component={Dashboard} /> */}

      </Tab.Navigator>
    
  );
}

export default BottomTabNavigator;
