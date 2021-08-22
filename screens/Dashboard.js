import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import {loggingOut} from '../API/firebaseMethods';
import styles from './Stylesheet'
import {db} from '../config/keys'



export default function Dashboard({ navigation }) {
  let currentUserUID = firebase.auth().currentUser.uid;
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    async function getUserInfo(){
      // let doc = await firebase
      // .firestore()
      // .collection('users')
      // .doc(currentUserUID)
      // .get();

      let doc = await db
      .collection('users')
      .doc(currentUserUID)
      .get();

      if (!doc.exists){
        Alert.alert('No user data found!')
      } else {
        let dataObj = doc.data();
        // {"email": "q@q.com",  "firstName": "Q", "lastName": "Q",}
        setFirstName(dataObj.firstName)
      }
    }
    getUserInfo();
  })

  const handleLogout = () => {
    loggingOut();
    navigation.replace('Home');
  };
  // const handleExercises = () => {
  //   navigation.replace('Exercises');
  // };
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Dashboard</Text>
      <Text style={styles.text}>Hi {firstName}</Text>
      {/* <TouchableOpacity style={styles.button} onPress={handleExercises}>
        <Text style={styles.buttonText}>My Exercises</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.button} onPress={handleWorkouts}>
        <Text style={styles.buttonText}>My Profile</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      {/* <TabNavigator /> */}
    </SafeAreaView>
  )
}
