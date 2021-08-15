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

  async function handlePress() {
    try {
      if (auth().currentUser) {

        let updateObj = {
          name,
          weight,
          notes,
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
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate('Exercises')}>
          <Text style={styles.darkText}>Back To Exercises</Text>
        </TouchableOpacity>
      </View>
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

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Update Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
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
//   },
//   titleText: {
//     textAlign: 'center',
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: 'white',
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
