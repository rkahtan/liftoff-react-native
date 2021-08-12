import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/keys';
import axios from 'axios';
import * as firebase from 'firebase';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Keyboard,
  TextInput,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Exercises({ navigation }) {
  let currentUserUID = firebase.auth().currentUser.uid;
  const [firstName, setFirstName] = useState('');
  const [exercises, setExercises] = useState([]);
  useEffect(
    () => {
      async function getUserInfo() {
        let doc = await firebase
          .firestore()
          .collection('users')
          .doc(currentUserUID)
          .get();
        if (!doc.exists) {
          Alert.alert('No user data found!');
        } else {
          let dataObj = doc.data();
          // {"email": "q@q.com",  "firstName": "Q", "lastName": "Q",}
          setFirstName(dataObj.firstName);
        }
      }
      getUserInfo();
      async function getUserExercises() {
        //do i need to do an axios call/express route and get db info in there?

        const exercisesRef = db.collection('exercises');
        const queryRef = await exercisesRef
          .where('user', '==', currentUserUID)
          .get();

        // queryRef.forEach(doc => {
        //   console.log(doc.id, '=>', doc.data());
        // });
        // P1XmFBh2Efz0gXjdpSPM => Object {
        //   "name": "Bicep curl",
        //   "notes": "",
        //   "user": "c0TEgVzUpdUwKWYbs10NZA4uNDJ3",
        //   "weight": "15 lb",
        // }
        let exs = [];
        queryRef.forEach((doc) => {
          exs.push(doc.data());
        });
        //console.log(exs); //[{ex}]
        
        return () => setExercises(exs); //exercises remains an empty array
      }
      getUserExercises()
      
    
    }
    //[]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{firstName}'s Exercises</Text>

      {exercises.map((exercise) => {
        return (
          <View key={exercise.name}>
            {/* <Link to={`/exercises/${exercise.id}`}> */}
            <Text>{exercise.name}</Text>
            {exercise.weight && <Text>Weight: {exercise.weight}</Text>}
            {exercise.notes && <Text>Notes: {exercise.notes}</Text>}
            {/* </Link> */}
          </View>
        );
      })}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddExercise')}
      >
        <Text style={styles.buttonText}>Add An Exercise</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Exercises;

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 10,
    backgroundColor: '#223023',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: '4%',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#899C89',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: '2%',
    marginBottom: '10%',
    fontWeight: 'bold',
    color: 'white',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    width: 300,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    margin: 5,
  },
});
