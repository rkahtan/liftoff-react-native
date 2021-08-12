import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { db, auth } from '../config/keys';
import { fetchExercises } from '../store/exercises';
// import AddExercise from './AddExercise';
import { View, Text, StyleSheet, Alert, ScrollView, Keyboard, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


function Exercises({navigation}) {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const emptyState = () => {
    setName('');
    setWeight('');
    setNotes('');
  };
  async function handlePress() {
    try {
      if (auth().currentUser) {
        const docRef = await db.collection('exercises').add({
          name: name,
          weight: weight,
          notes: notes
        })
        console.log('posted in firebase? ', docRef.id) //yes?
        // this.setState({
        //   name: '',
        //   weight: '',
        //   notes: ''
        // })
        navigation.push('Exercises')
      }
    } catch (error) {
      alert(error)
    }
  }


//   async componentDidMount() {
//     try {
//       let currentUserUID = firebase.auth().currentUser.uid;
//       console.log('id??? ', currentUserUID) //c0TEgVzUpdUwKWYbs10NZA4uNDJ3
//       let doc = await firebase
//       .firestore()
//       .collection('users')
//       .doc(currentUserUID)
//       .get();
//       if (!doc.exists){
//         Alert.alert('No user data found!')
//       } else {
//         let dataObj = doc.data();
//         console.log('dataObj: ', dataObj)

//         //setFirstName(dataObj.firstName)
//       } 
//     }catch (err) {
//         console.error(err)
//       }
      // const { token } = window.localStorage;
      // this.props.fetchExercises(token);
    // } catch (err) {
    //   this.setState({ error: err.message, loading: true });
    // }
  // }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.exercises === this.props.exercises) {
  //     return;
  //   } else {
  //     this.setState({ loading: false });
  //   }
  // }
 
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Your Exercises</Text>
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
export default (Exercises);

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