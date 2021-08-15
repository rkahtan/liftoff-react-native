import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './Stylesheet';



export default function SingleExercise({ route, navigation }) {
  const { exercise } = route.params;

  //delete:
  // db.collection('exercises').doc(exercise.id).delete();
  //navigation.navigate('Exercises')

  

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.navigate('Exercises')}>
          <Text style={styles.text}>Back To Exercises</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text>
          <Text style={styles.titleText}>{exercise.name}</Text>
          {'\n'}
          {exercise.weight && <Text>Weight: {exercise.weight}</Text>}
          {'\n'}
          {exercise.notes && <Text>Notes: {exercise.notes}</Text>}
        </Text>
      </View>

      <View>
        <Image source={require('../assets/generic-chart.png')} />
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('UpdateExercise', {
              exercise,
            })
          }
        >
          <Text style={styles.buttonText}>Update This Exercise</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
