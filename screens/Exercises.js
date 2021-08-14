import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/keys';
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
import styles from './Stylesheet';

function Exercises({ navigation }) {
  let currentUserUID = firebase.auth().currentUser.uid;
  const [firstName, setFirstName] = useState('');
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
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
      const exercisesRef = db.collection('exercises');
      const queryRef = await exercisesRef
        .where('user', '==', currentUserUID)
        .get();

      // Object {
      //   "id": "vq8rBUT1ucxuSYKF0JFo",
      //   "name": "Squat",
      //   "notes": "",
      //   "user": "c0TEgVzUpdUwKWYbs10NZA4uNDJ3",
      //   "weight": "50 lb",
      // },
      let exs = [];
      queryRef.forEach((doc) => {
        let id = doc.id;
        exs.push({ id, ...doc.data() });
      });

      //return () => setExercises();
      setExercises(exs);
    }
    getUserExercises();
  }, [exercises]);

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.text}>Back To Home</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titleText}>{firstName}'s Exercises</Text>

      <View style={styles.exercises}>
        {exercises.map((exercise, i) => {
          return (
            <Text key={i}>
              <TouchableOpacity
                style={styles.exerciseButton}
                onPress={() =>
                  navigation.navigate('SingleExercise', {
                    exercise,
                  })
                }
              >
                <Text style={styles.buttonText}>{exercise.name}</Text>
              </TouchableOpacity>
            </Text>
          );
        })}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddExercise')}
        >
          <Text style={styles.buttonText}>Add An Exercise</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Exercises;

// const styles = StyleSheet.create({
//   nav: {
//     top: 0
//   },
//   button: {
//     width: 200,
//     padding: 10,
//     backgroundColor: '#223023',
//     borderWidth: 3,
//     borderColor: 'white',
//     borderRadius: 15,
//     alignSelf: 'center',
//     margin: '4%',
//   },
//   buttonText: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   container: {
//     height: '100%',
//     width: '100%',
//     backgroundColor: '#899C89',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   text: {
//     textAlign: 'center',
//     fontSize: 20,
//     marginTop: '2%',
//     marginBottom: '10%',
//     fontWeight: 'bold',
//     color: 'white',
//     padding: 10,
//   },
//   titleText: {
//     textAlign: 'center',
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'white',
//     top: 15,
//     padding: 20,
//   },
//   textInput: {
//     width: 300,
//     fontSize: 18,
//     borderWidth: 1,
//     borderColor: 'white',
//     padding: 10,
//     margin: 5,
//   },
// });
