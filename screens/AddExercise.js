import React, { useState } from 'react';
import { db, auth } from '../config/keys';
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
import * as firebase from 'firebase';
import styles from './Stylesheet';

function AddExercise({ navigation }) {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  // const emptyState = () => {
  //   setName('');
  //   setWeight('');
  //   setNotes('');
  // };
  async function handlePress() {
    try {
      if (auth().currentUser) {
        let currentUserUID = firebase.auth().currentUser.uid;
        const docRef = await db.collection('exercises').add({
          name: name,
          weight: weight,
          notes: notes,
          user: currentUserUID,
        });

        if (weight) {
          console.log('weight');
          //add metadata field if weight is used
        }

        let time = new Date();
        // Create file metadata to update https://firebase.google.com/docs/storage/web/file-metadata#file_metadata_properties
        let newMetadata = {
          time: weight,
        };

        // Update metadata 
        //forestRef.updateMetadata(newMetadata)

        //getting metsdata - doesn't work rn but might just be bc no metadata?
        // docRef.getMetadata()
        // .then((metadata) => {
        //   console.log(metadata)
        // })

        //get metadata and use it to populate chart

        navigation.navigate('Exercises');
        //doesn't show new exercise upon re-navigation
        //does show new exercise when you go back home and then click into it
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate('Exercises')}>
          <Text style={styles.text}>Back To Exercises</Text>
        </TouchableOpacity>
      </View>
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
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Create Exercise</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AddExercise;

// const styles = StyleSheet.create({
//   button: {
//     width: 200,
//     padding: 10,
//     backgroundColor: '#223023',
//     borderWidth: 3,
//     borderColor: 'white',
//     borderRadius: 15,
//     alignSelf: 'center',
//     margin: "4%",
//   },
//   buttonText: {
//     fontSize:20,
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
//     fontSize:18,
//     borderWidth: 1,
//     borderColor:'white',
//     padding: 10,
//     margin: 5,
//   },
// });
