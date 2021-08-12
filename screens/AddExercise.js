import React, { useState } from 'react';
import { db, auth } from '../config/keys';
import { View, Text, StyleSheet, Alert, ScrollView, Keyboard, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';


function AddExercise({navigation}) {
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
          user: currentUserUID
        })
        //how to associate this exercise to the user?
        navigation.navigate('Exercises')
      }
    } catch (error) {
      alert(error)
    }
  }

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Add An Exercise</Text>
        
        <ScrollView onBlur={Keyboard.dismiss}>
          <TextInput
          style={styles.textInput}
          placeholder="Exercise Name*"
          value={name}
          onChangeText={(name) => setName(name)}
          />
         <TextInput
          style={styles.textInput}
          placeholder="Weight*"
          value={weight}
          onChangeText={(weight) => setWeight(weight)}
         />

         <TextInput
          style={styles.textInput}
          placeholder="Any Notes?*"
          value={notes}
          onChangeText={(notes) => setNotes(notes)}
         />

          
          <TouchableOpacity style={styles.button} 
          onPress={handlePress}
          >
           <Text style={styles.buttonText}>Create Exercise</Text>
          </TouchableOpacity>

          
       </ScrollView>
          {/* {this.state.error && (
            <div>
              <h1>Error: {this.state.error}</h1>
            </div>
          )}
          {this.state.loading && (
            <div>
              <h1>Loading</h1>
            </div>
          )}
        </div>

        {this.props.exercises.map((exercise) => {
          return (
            <div key={exercise.id}>
              <Link to={`/exercises/${exercise.id}`}>
                <h1>{exercise.name}</h1>
                {exercise.weight && <h2>Weight: {exercise.weight}</h2>}
                {exercise.sets && <h2>Sets: {exercise.sets}</h2>}
                {exercise.reps && <h2>Reps: {exercise.reps}</h2>}
                {exercise.notes && <h2>Notes: {exercise.notes}</h2>}
              </Link>
            </div>
          );
        })}
        <div>
          <h1>Add An Exercise:</h1>
   */}
       
      </View>
    );
  }
// }

// const mapState = (state) => {
//   return {
//     exercises: state.exercises,
//   };
// };

// const mapDispatch = (dispatch, token) => {
//   return {
//     fetchExercises: (token) => dispatch(fetchExercises(token)),
//   };
// };

// export default connect(mapState, mapDispatch)(Exercises);
export default (AddExercise);

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 10,
    backgroundColor: '#223023',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: "4%",
  },
  buttonText: {
    fontSize:20,
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
    fontSize:18,
    borderWidth: 1,
    borderColor:'white',
    padding: 10,
    margin: 5,
  },
});