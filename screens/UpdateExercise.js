import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/keys';
import * as firebase from 'firebase';
import {
  View,
  Text,
  ScrollView,
  Keyboard,
  TextInput,
  SafeAreaView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './Stylesheet'

export default function UpdateExercise({ route, navigation }) {
  const { exercise } = route.params;
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [tag, setTag] = useState('');


  async function handlePress() {
    try {
      if (auth().currentUser) {

        let updateObj = {
          name,
          weight,
          notes,
          tag
        };
        for (let key in updateObj) {
          if (updateObj[key] === '') delete updateObj[key];
        }

        const db = firebase.firestore();
        await db
          .collection('exercises')
          .doc(exercise.id)
          .update(updateObj);

        let newDoc = await db
          .collection('exercises')
          .doc(exercise.id)
          .get();

       let id = exercise.id

       let newProps = {id, ...newDoc.data()}
       

        navigation.navigate('SingleExercise', {
          exercise: newProps
        });
 
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
    
      <Text style={styles.titleText}>Update Exercise</Text>

      <ScrollView onBlur={Keyboard.dismiss}>
        <TextInput
          style={styles.textInput}
          placeholder='Exercise Name*'
          value={name}
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Weight*'
          value={weight}
          onChangeText={(weight) => setWeight(weight)}
        />

        <TextInput
          style={styles.textInput}
          placeholder='Any Notes?*'
          value={notes}
          onChangeText={(notes) => setNotes(notes)}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Tag*'
          value={tag}
          onChangeText={(tag) => setTag(tag)}
        />

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Update Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

