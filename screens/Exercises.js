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
  SafeAreaView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './Stylesheet';

// let dummyDataFUFirestore = [
//   [{ name: 'bench press', weight: '20 lbs', tag: 'chest' }],
//   [{ name: 'front squat', weight: '35 lbs', tag: 'quads' }],
//   [
//     { name: 'squat', weight: '50 lbs', tag: 'legs' },
//     { name: 'split squat', weight: '50 lbs', tag: 'legs' },
//     { name: 'goblet squat', weight: '55 lbs', tag: 'legs' },
//   ],
//   [
//     { name: 'dumbell row', weight: '45 lbs', tag: 'back' },
//     { name: 'kettlebell row', weight: '40 lbs', tag: 'back' },
//   ],
//   [
//     { name: 'arnold press', weight: '40 lbs', tag: 'shoulders' },
//     { name: 'upright row', weight: '50 lbs', tag: 'shoulders' },
//     { name: 'shoulder press', weight: '40 lbs', tag: 'shoulders' },
//   ],
// ];

let dummyDataFUFirestore = [
  { name: 'bench press', weight: '20 lbs', tag: 'chest' },
  { name: 'front squat', weight: '35 lbs', tag: 'quads' },

  { name: 'squat', weight: '50 lbs', tag: 'legs' },
  { name: 'split squat', weight: '50 lbs', tag: 'legs' },
  { name: 'goblet squat', weight: '55 lbs', tag: 'legs' },
  ,
  { name: 'dumbell row', weight: '45 lbs', tag: 'back' },
  { name: 'kettlebell row', weight: '40 lbs', tag: 'back' },
  ,
  { name: 'arnold press', weight: '40 lbs', tag: 'shoulders' },
  { name: 'upright row', weight: '50 lbs', tag: 'shoulders' },
  { name: 'shoulder press', weight: '40 lbs', tag: 'shoulders' },
  ,
];
//other ideas:
//group exercises by tag name? (quads, triceps, accessory exercises, etc)
//get all exercises by user, sort by tag, make section header the tag?

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
        const exercisesRef = db.collection('exercises');
        const queryRef = await exercisesRef
          .where('user', '==', currentUserUID)
          .get();
        //if info isn't updating properly try snapshot method (updates with db changes)
        // db.collection('exercises').onSnapshot();

        //OR use info from cache to reduce database queries
        //https://medium.com/firebase-tips-tricks/how-to-drastically-reduce-the-number-of-reads-when-no-documents-are-changed-in-firestore-8760e2f25e9e
        //https://medium.com/firebase-tips-tricks/how-to-reduce-the-number-of-read-operations-in-cloud-firestore-9f9d6f5a271

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

        //sort by tag
        //group each tag into a sub-array?
        //change map function

        //return () => setExercises();
        setExercises(exs);
      }
      getUserExercises();
    },
    [exercises]
    //or []
    //if the hook keeps running (tho only when exercises change?) and is calling db too much
  );

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.text}>Back To Home</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text>
          {firstName ? (
            <Text style={styles.titleText}>{firstName}'s Exercises</Text>
          ) : (
            <Text style={styles.titleText}>Exercises</Text>
          )}
        </Text>

        <Text style={styles.info}>
          {exercises.length
            ? exercises.map((exercise, i) => {
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
              })
            : dummyDataFUFirestore.map((exercise, i) => {
                return (
                  <Text key={i}>
                    {!dummyDataFUFirestore[i - 1] ||
                    exercise.tag !== dummyDataFUFirestore[i - 1].tag ? (
                      <Text style={styles.text} key={i}>
                        {exercise.tag}
                      </Text>
                    ) : ''}
                   
                    <Text>
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
                  </Text>
                );
              })}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddExercise')}
        >
          <Text style={styles.buttonText}>Add An Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Exercises;
