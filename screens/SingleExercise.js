import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SingleExercise({ route, navigation }) {
  const { exercise } = route.params;

  return (
    <View style={styles.container}>
      <Text>
        <Text>
          <Text style={styles.titleText}>{exercise.name}</Text>
          {'\n'}
          {exercise.weight && <Text>Weight: {exercise.weight}</Text>}
          {'\n'}
          {exercise.notes && <Text>Notes: {exercise.notes}</Text>}
        </Text>

        {/* <Image blurRadius={5} source={{uri: 'https://www.moltexenergy.com/wp-content/uploads/generic-chart.png',}} /> */}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('UpdateExercise', {
            exercise,
          })
        }
      >
        <Text style={styles.text}>Update This Exercise</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    padding: 10,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    top: 15,
    padding: 20,
  },
  textInput: {
    width: 300,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    margin: 5,
  },
  image: {},
});
