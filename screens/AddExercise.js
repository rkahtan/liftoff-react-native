import React, { useState } from 'react';
import { db, auth } from '../config/keys';
import {
  View,
  Text,
  Keyboard,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import styles from './Stylesheet';


function AddExercise({ navigation }) {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [tag, setTag] = useState('');
  // const emptyState = () => {
  //   setName('');
  //   setWeight('');
  //   setNotes('');
  // };
  async function handlePress() {
    try {
      if (auth().currentUser) {
        if (!name) {
          Alert.alert('Name field is required.');
        }

        if (!tag) {
          Alert.alert('Tag field is required.');
        } else {
          let currentUserUID = firebase.auth().currentUser.uid;
          const docRef = await db.collection('exercises').add({
            name: name,
            weight: weight,
            notes: notes,
            user: currentUserUID,
            tag: tag,
          });

          if (weight) {
            console.log('weight');
            //add metadata field if weight is used
            let time = new Date();
            // Create file metadata to update https://firebase.google.com/docs/storage/web/file-metadata#file_metadata_properties
            let newMetadata = {
              time: weight,
            };
          }



          navigation.navigate('Exercises');
        }
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        <Text style={styles.titleText}>Add An Exercise</Text>
      </Text>
      <View onBlur={Keyboard.dismiss}>
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
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Create Exercise</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default AddExercise;
